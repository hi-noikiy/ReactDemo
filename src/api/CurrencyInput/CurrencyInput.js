import React, {
    PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import mask from './mask.js'
import cnMoney from './cnMoney.js'
import './currency.css'

const CurrencyInput = React.createClass({

    /**
     * Prop validation.
     * @see https://facebook.github.io/react/docs/component-specs.html#proptypes
     */
    propTypes: {
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        decimalSeparator: PropTypes.string,
        thousandSeparator: PropTypes.string,
        precision: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        inputType: PropTypes.string,
        allowNegative: PropTypes.bool,
        allowEmpty: PropTypes.bool,
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        displayType: PropTypes.string,
        alignType: PropTypes.node,
        autoAdd: PropTypes.bool,
    },


    /**
     * Component lifecycle function.
     *
     * Invoked once and cached when the class is created. Values in the mapping will be set on this.props if that
     * prop is not specified by the parent component
     *
     * @see https://facebook.github.io/react/docs/component-specs.html#getdefaultprops
     */
    getDefaultProps() {
        return {
            onChange: function(maskValue, value, event) { /*no-op*/ },
            value: '0',
            decimalSeparator: '.',
            thousandSeparator: ',',
            precision: '2',
            inputType: 'text',
            allowNegative: true,
            prefix: '',
            suffix: '',
            displayType: '1',
            alignType: 0,
            autoAdd: true,
        }
    },

    /**
     * General function used to cleanup and define the final props used for rendering
     * @returns {{ maskedValue: {String}, value: {Number}, customProps: {Object} }}
     */
    prepareProps(props) {
        let customProps = {...props
        }; // babeljs converts to Object.assign, then polyfills.
        delete customProps.onChange;
        delete customProps.value;
        delete customProps.decimalSeparator;
        delete customProps.thousandSeparator;
        delete customProps.precision;
        delete customProps.inputType;
        delete customProps.allowNegative;
        delete customProps.allowEmpty;
        delete customProps.prefix;
        delete customProps.suffix;
        delete customProps.displayType;
        delete customProps.alignType;
        delete customProps.autoAdd;

        let initialValue = props.value;
        if (!initialValue) {
            initialValue = props.allowEmpty ? null : '';
        } else {

            if (typeof initialValue === 'string') {
                // Some people, when confronted with a problem, think "I know, I'll use regular expressions."
                // Now they have two problems.

                // Strip out thousand separators, prefix, and suffix, etc.
                if (props.thousandSeparator === ".") {
                    // special handle the . thousand separator
                    initialValue = initialValue.replace(/\./g, '');
                }

                if (props.decimalSeparator !== ".") {
                    // fix the decimal separator
                    initialValue = initialValue.replace(new RegExp(props.decimalSeparator, 'g'), '.');
                }

                //Strip out anything that is not a digit, -, or decimal separator
                initialValue = initialValue.replace(/[^0-9-.]/g, '');

                // now we can parse.
                initialValue = parseFloat(initialValue);
            }
            initialValue = Number(initialValue).toLocaleString(undefined, {
                style: 'decimal',
                minimumFractionDigits: props.precision,
                maximumFractionDigits: props.precision
            })

        }

        const {
            maskedValue,
            value
        } = mask(
            initialValue,
            props.precision,
            props.decimalSeparator,
            props.thousandSeparator,
            props.allowNegative,
            props.prefix,
            props.suffix,
            props.autoAdd
        );

        return {
            maskedValue,
            value,
            customProps
        };
    },

    /**
     * Component lifecycle function.
     * Invoked once before the component is mounted. The return value will be used as the initial value of this.state
     *
     * @returns {{ maskedValue: {String}, value: {Number}, customProps: {Object} }}
     * @see https://facebook.github.io/react/docs/component-specs.html#getinitialstate
     */
    getInitialState() {
        return this.prepareProps(this.props);
    },


    /**
     * Component lifecycle function.
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     *
     * @param nextProps
     * @see https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
     */
    componentWillReceiveProps(nextProps) {
        this.setState(this.prepareProps(nextProps));
    },


    /**
     * Exposes the current masked value.
     *
     * @returns {String}
     */
    getMaskedValue() {
        return this.state.maskedValue;
    },


    componentDidMount() {
        let node = ReactDOM.findDOMNode(this.theInput);

        let selectionEnd = Math.min(node.selectionEnd, this.theInput.value.length - this.props.suffix.length);
        let selectionStart = Math.min(node.selectionStart, selectionEnd);

        node.setSelectionRange(selectionStart, selectionEnd);
    },

    generateRegExp(precision = 2, decimalSeparator = '.', allowNegative = false) {
        let regexp = '^';

        if (allowNegative) {
            regexp += '-?';
            regexp += '[0-9]{0,}';
        } else {
            regexp += '[0-9]+';
        }

        if (precision > 0) {
            if (decimalSeparator === '.') {
                regexp += '([.]{0,1}[0-9]{0,';
            } else {
                regexp += '([';
                regexp += decimalSeparator;
                regexp += ']{0,1}[0-9]{0,';
            }

            regexp += precision
            regexp += '})?';
        }

        regexp += '$';

        return regexp;
    },

    /**
     * onChange Event Handler
     * @param event
     */
    handleChange(event) {
        event.preventDefault();

        let pattern = this.generateRegExp(this.props.precision, this.props.decimalSeparator, this.props.allowNegative);
        let regexp = new RegExp(pattern, 'g');

        if (event.target.value === '' || regexp.test(event.target.value)) {
            let maskedValue = event.target.value;
            let value = event.target.value;
            let cnMoneyValue = cnMoney(value);

            this.setState({
                maskedValue,
                value,
                cnMoneyValue
            }, () => {
                this.props.onChange(maskedValue, value, event);
            });
        }
    },

    /**
     * onFocus Event Handler
     * @param event
     */
    handleFocus(event) {
        let maskedValue = this.theInput.value;
        let value = this.theInput.value;
        let cnMoneyValue = '';
        if (this.theInput.value !== '') {
            maskedValue = this.theInput.value.replace(new RegExp(this.props.thousandSeparator, 'g'), '');
            value = maskedValue;
            cnMoneyValue = cnMoney(value);
        }

        //Whenever we receive focus check to see if the position is before the suffix, if not, move it.
        let selectionEnd = this.theInput.value.length - this.props.suffix.length;
        let selectionStart = this.props.prefix.length;
        // console.log(selectionStart, selectionEnd);
        event.target.setSelectionRange(selectionStart, selectionEnd);
        this.setState({
            selectionStart,
            selectionEnd,
            maskedValue,
            value,
            cnMoneyValue
        }, () => {
            this.props.onChange(maskedValue, value, event);
        });
    },

    handleBlur(event) {
        let {
            maskedValue,
            value
        } = mask(
            event.target.value,
            this.props.precision,
            this.props.decimalSeparator,
            this.props.thousandSeparator,
            this.props.allowNegative,
            this.props.prefix,
            this.props.suffix,
            this.props.autoAdd
        );

        this.setState({
            selectionStart: null,
            selectionEnd: null,
            maskedValue,
            value
        }, () => {
            this.props.onChange(maskedValue, value, event);
        });
    },


    /**
     * Component lifecycle function.
     * @returns {XML}
     * @see https://facebook.github.io/react/docs/component-specs.html#render
     */
    render() {
        let inputClassName = this.props.displayType === '2' ? 'cnmoney-control' : 'form-control';
        let cnlabelClassName = this.props.displayType === '2' ? 'cnmoney-label' : 'cnmoney-nonelabel';
        let styleObj = {
            textAlign: this.props.alignType === 0 ? 'right' : 'left',
        };
        return (
            <div>
                <input className={inputClassName}
                    ref={(input) => { this.theInput = input; }}
                    type={this.props.inputType}
                    value={this.state.maskedValue}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onMouseUp={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyPress={this.onKeyPressHandle}
                    {...this.state.customProps}
                    style={styleObj}
                />
                <label className={cnlabelClassName}>{this.state.cnMoneyValue}</label>
            </div>
        )
    }
});


export default CurrencyInput