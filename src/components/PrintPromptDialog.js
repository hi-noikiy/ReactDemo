import React from 'react';
import {Modal,Button,Grid,Row,Col} from 'react-bootstrap';
import UIGridPanel from './UIGridPanel.js';
import ComponentUtil from './ComponentUtil.js';
import $ from 'jquery'; // eslint-disable-line

class PrintPromptDialog extends React.Component {

   constructor(props) {
    	super(props);
    	this.hideModal = this.hideModal.bind(this); //构造函数中绑定
    	this.print = this.print.bind(this); //构造函数中绑定
    	this.state = {
    		show: false,
    		billPay: '',
    	}
    }

    hideModal() {
        this.setState({
            show: false,
            billPay: '',
        });
        
    }
    doPrintEbillDocument(taskformat) {
		if(taskformat && taskformat.item.constructor === Array){
			let docItems:Array = taskformat.item;
			let fieldName:String="";
			let fieldValue:String="";
			let docItemsing:Object;
			let ksing:uint=0;
			for(;ksing< docItems.length;ksing++){
				docItemsing =  docItems[ksing];
				fieldName= docItemsing.field_name ;
				if(fieldName == "NTYP2HDB") {
					fieldValue = docItemsing.text ;
					break;
				}
			}
			let printTypeName = 'EBillPayPrint'+fieldValue;
			
			// $('#printData').jqprint({
			//     debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
			//     importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
			//     printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
			//     operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
			// });
			// $('#printData').printArea({
			// 	mode: 'popup',
			// 	popClose: false,
			// });
			var content = document.getElementById("printData");
			var pri = document.getElementById("ifmcontentstoprint").contentWindow;
			pri.document.open();
			pri.document.write(content.innerHTML);
			pri.document.close();
			pri.focus();
			pri.print();
			this.setState({
	            billPay: printTypeName,
	        });
		}
	}
    print(evt) {
    	let dpi = 4;
    	let screenDpi = window.screen.deviceXDPI;
    	let paperFormat = {};
	    let prodTotal = 0;
		let bco1=null;
		let _data = this.props.commonProps._data;
		let _valueObject = this.props.commonProps._valueObject;
		let perData = this.props.commonProps.perData;
		let task1 = this.props.commonProps.task1;
		let taskformat = this.props.commonProps.taskformat;
		let taskdata = this.props.commonProps.taskdata;
		let footerHeight = 20;
		let prodIndex;
		let rotation = this.props.commonProps.rotation ;
		let pageWidth = this.props.commonProps.pageWidth ;
		let pageHeight= this.props.commonProps.pageHeight ;
		let rePrintLabel = this.props.commonProps.rePrintLabel ;
		if(_data){
			if(taskdata&&taskdata.property.constructor === Array && taskdata.property.length>0){
				if(taskformat.fmt_name === 'ebillDocumentM') { //电子回单批量打印专用
					
					if(taskformat && taskformat.item.constructor === Array){
						let docItems:Array = taskformat.item;
						let fieldName:String="";
						let fieldValue:String="";
						let dbId:String = "" ;
						let docItemsing:Object;
						let imgPath:String="" ;
						for(let mksing:uint=0;mksing< docItems.length;mksing++){
							docItemsing =  docItems[mksing];
							fieldName= docItemsing.field_name ;
							if(fieldName == "NTYP2HDB") {
								fieldValue = docItemsing.text ;
								dbId = docItemsing.dbid ;
							} else if(fieldName == "NPATHSIN") {
								imgPath=docItemsing.text ;
							}
						}
						
						let downLoadURL:URLRequest = new URLRequest();  
						
						// downLoadURL.url = "showpic?path="+imgPath;
						// var stream:URLStream = new URLStream();
						// stream.addEventListener(Event.COMPLETE, function(event:Event):void {onLoadComplete(event, stream, _valueObject, imgPath, fieldValue);});  
						// stream.load(downLoadURL);
					}
					
					
				} else if(taskformat.fmt_name === 'ebillDocument') { //电子回单打印专用
					this.doPrintEbillDocument(taskformat) ;
				}else{
					var printJob:CustFlexPrintJob =new CustFlexPrintJob();  
					if(taskformat.fmt_name == 'ecdsDocument') { //电票正面打印专用
						printJob.printAsBitmap = false;  
						if (printJob.start() == true) {
						// bco1 = new EcdsPrintDocument() ;
						// bco1.width=950;
						// bco1.height=650;
						// EcdsPrintDocument(bco1).setValueWithObject(taskformat) ;
						// bco1.rotation = 90 ;
						
						// if(bco1){
						// 	FlexGlobals.topLevelApplication.addElement(bco1);
						// 	printJob.addObject(bco1,FlexPrintJobScaleType.SHOW_ALL);
						// 	FlexGlobals.topLevelApplication.removeElement(bco1);
						// }
						// UIComponent(bco1).invalidateSize() ;
						// UIComponent(bco1).invalidateDisplayList();
						// UIComponent(bco1).validateNow() ;
						// // Send the job to the printer.
						// printJob.send();
						}
					} else if(taskformat.fmt_name == 'ecdsDocumentBack') { //电票正面打印专用
						// printJob.printAsBitmap = false;  
						// if (printJob.start() == true) {
						// 	bco1 = new EcdsPrintDocumentBack() ;
						// 	bco1.width=880;
						// 	bco1.height=2150;
						// 	EcdsPrintDocumentBack(bco1).setValueWithObject(taskformat) ;
						// 	if(bco1){
						// 		FlexGlobals.topLevelApplication.addElement(bco1);
						// 		printJob.addObject(bco1,FlexPrintJobScaleType.SHOW_ALL);
						// 		FlexGlobals.topLevelApplication.removeElement(bco1);
						// 	}
						// UIComponent(bco1).invalidateSize() ;
						// UIComponent(bco1).invalidateDisplayList();
						// UIComponent(bco1).validateNow() ;
						
						// 	// Send the job to the printer.
						// 	printJob.send();
						// }
					} else if(taskformat.fmt_name == '753100P') { //柜员轧帐
						printJob.printAsBitmap = false;  
						if (printJob.start() == true) {
						var doc753100:Doc753100 = new Doc753100() ;
						// FlexGlobals.topLevelApplication.addElement(doc753100);
						
						doc753100.gridData1 = _valueObject["CDO31001"].dataProvider ;
						doc753100.gridData2 = _valueObject["CDO310011"].dataProvider ;
						doc753100.gridData3 = _valueObject["CDO31003"].dataProvider ;
						doc753100.setValueWithObject(taskformat);
						doc753100.processValueWithObject(taskformat) ;
						
						doc753100.maxHeight = printJob.pageHeight ;
						doc753100.maxWidth = printJob.pageWidth ;
						doc753100.width=printJob.pageWidth ;
						doc753100.height=printJob.pageHeight ;
						
						doc753100.generatePrintPage(printJob) ;
						
						// FlexGlobals.topLevelApplication.removeElement(doc753100);
						
						// Send the job to the printer.
						printJob.send();
						}
					}  else if(taskformat.fmt_name == '753160P') { //柜员轧帐
						printJob.printAsBitmap = false;  
						if (printJob.start() == true) {
						var doc753160p:Doc753160P = new Doc753160P() ;
						// FlexGlobals.topLevelApplication.addElement(doc753160p);
						
						doc753160p.gridData1 = _valueObject["CDO31602"].dataProvider ;
						doc753160p.gridData2 = _valueObject["CDO31603"].dataProvider ;
						doc753160p.gridData3 = _valueObject["CDO31604"].dataProvider ;
						doc753160p.setValueWithObject(taskformat);
						doc753160p.processValueWithObject(taskformat) ;
						
						doc753160p.maxHeight = printJob.pageHeight ;
						doc753160p.maxWidth = printJob.pageWidth ;
						doc753160p.width=printJob.pageWidth ;
						doc753160p.height=printJob.pageHeight ;
						
						doc753160p.generatePrintPage(printJob) ;
						
						// FlexGlobals.topLevelApplication.removeElement(doc753160p);
						
						// Send the job to the printer.
						printJob.send();
						}
					}  else if(taskformat.fmt_name == '751000P') { //机构轧帐
						printJob.printAsBitmap = false;  
						if (printJob.start() == true) {
							var doc751000p:Doc751000P = new Doc751000P() ;
							// FlexGlobals.topLevelApplication.addElement(doc751000p);
							
							doc751000p.gridData1 = _valueObject["CDO10001"].dataProvider ;
							doc751000p.gridData2 = _valueObject["CDO10002"].dataProvider ;
							doc751000p.gridData3 = _valueObject["CDO10003"].dataProvider ;
							doc751000p.setValueWithObject(taskformat);
							doc751000p.processValueWithObject(taskformat) ;
							
							doc751000p.maxHeight = printJob.pageHeight ;
							doc751000p.maxWidth = printJob.pageWidth ;
							doc751000p.width=printJob.pageWidth ;
							doc751000p.height=printJob.pageHeight ;
							
							doc751000p.generatePrintPage(printJob) ;
							
							// FlexGlobals.topLevelApplication.removeElement(doc751000p);
							
							// Send the job to the printer.
							printJob.send();
						}
					} else if(taskformat.fmt_name == '751070P') { //机构轧帐(查询)
						printJob.printAsBitmap = false;
						if (printJob.start() == true) {
							var doc751070p:Doc751070P = new Doc751070P() ;
							// FlexGlobals.topLevelApplication.addElement(doc751070p);
							
							doc751070p.gridData1 = _valueObject["CDO10701"].dataProvider ;
							doc751070p.gridData2 = _valueObject["CDO10702"].dataProvider ;
							doc751070p.gridData3 = _valueObject["CDO10703"].dataProvider ;
							doc751070p.setValueWithObject(taskformat);
							doc751070p.processValueWithObject(taskformat) ;
							
							doc751070p.maxHeight = printJob.pageHeight ;
							doc751070p.maxWidth = printJob.pageWidth ;
							doc751070p.width=printJob.pageWidth ;
							doc751070p.height=printJob.pageHeight ;
							
							doc751070p.generatePrintPage(printJob) ;
							
							// FlexGlobals.topLevelApplication.removeElement(doc751070p);
							
							// Send the job to the printer.
							printJob.send();
						}
					} else if(taskformat.fmt_name == '553050P') { //机构轧帐(查询)
						printJob.printAsBitmap = false;  
						if (printJob.start() == true) {
							var doc553050p:Doc553050P = new Doc553050P() ;
							// FlexGlobals.topLevelApplication.addElement(doc553050p);
							
							doc553050p.gridData1 = _valueObject["NBO305011"].dataProvider ;
							
							doc553050p.setValueWithObject(taskformat) ;
							doc553050p.processValueWithObject(taskformat, printJob) ;
						}
					} else if(taskformat.fmt_name == '553040P') { //机构轧帐(查询)
						printJob.printAsBitmap = false;  
						if (printJob.start() == true) {
							var doc553040p:Doc553040P = new Doc553040P() ;
							// FlexGlobals.topLevelApplication.addElement(doc553040p);
							
							doc553040p.gridData1 = _valueObject["NBO30401"].dataProvider ;
							
							doc553040p.setValueWithObject(taskformat) ;
							doc553040p.processValueWithObject(taskformat, printJob) ;
						}
					} else {
						// var screenDpi:Number = Capabilities.screenDPI ;
						printJob.printAsBitmap = false;  
						if (printJob.start() == true) {
					var dbids:Array =  taskdata.property;
					for(var i:int=0;i<dbids.length;i++){
						var dbid:String = dbids[i].name;
						if(dbids[i].many){
							
							if(dbids[i].list.constructor === Array){
								var thePrintView:FormPrintView = new FormPrintView();
								// FlexGlobals.topLevelApplication.addElement(thePrintView);
								//Set the print view properties.
								thePrintView.width=printJob.pageWidth;
								thePrintView.height=printJob.pageHeight;
								
								thePrintView.myDataGrid.columns =  _valueObject[dbid].columns;
								thePrintView.myDataGrid.dataProvider = _valueObject[dbid].dataProvider;
								thePrintView.header.headerText.text=dbid;
								// Create a single-page image.
								thePrintView.showPage("single");
								thePrintView.prodTotal=prodTotal;
								if (!thePrintView.myDataGrid.validNextPage)  {
									printJob.addObject(thePrintView);
								}else {
									// Create the first page and add it to the print job.
									thePrintView.showPage("first");
									printJob.addObject(thePrintView);
									thePrintView.pageNumber++;
									// Loop through the following code until all pages are queued.
									while (true) {
										// Move the next page of data to the top of the print grid.
										thePrintView.myDataGrid.nextPage();
										thePrintView.showPage("last");
										// If the page holds the remaining data, or if the last page
										// was completely filled by the last grid data, queue it for printing.
										// Test if there is data for another PrintDataGrid page.
										if (!thePrintView.myDataGrid.validNextPage) {
											// This is the last page; queue it and exit the print loop.
											printJob.addObject(thePrintView);
											break;
										} else {
											// This is not the last page. Queue a middle page.
											thePrintView.showPage("middle");
											printJob.addObject(thePrintView);
											thePrintView.pageNumber++;
										}
									}
								}
								// All pages are queued; remove the FormPrintView control to free memory.
								// FlexGlobals.topLevelApplication.removeElement(thePrintView);
							}else{
								if(!bco1){
									bco1 = new BorderContainer();
									//												FlexGlobals.topLevelApplication.addElement(bco1);
									//Set the print view properties.
									bco1.width=paperFormat.width;
									bco1.height=paperFormat.height*paperFormat.scale;
									bco1.setStyle("wordWrap",true);
									
									var curlFieldObj:Object = new Object();
									var lineHGroup:BorderContainer = new BorderContainer();
									lineHGroup.setStyle("borderVisible",false);
									lineHGroup.height=30;
									var curLeft:int = 0;
									if(taskformat.item.constructor === Array){
										var docItemssingle:Array = taskformat.item;
										for(var ksingle:uint=0;ksingle< docItemssingle.length;ksingle++){
											var docItemsingle:Object =  docItemssingle[ksingle];
											if(docItemsingle.newline=="1"){
												lineHGroup = new BorderContainer();
												lineHGroup.setStyle("borderVisible",false);
												lineHGroup.height=30;
												curLeft=0;
											}
											
											var ll1single:Label = new Label();
											if(docItemsingle.field_name){
												ll1single.name=docItemsingle.field_name;
												curlFieldObj[docItemsingle.field_name]=ll1single;
											}
											if(docItemsingle.under_line==true){
												ll1single.setStyle("textDecoration","underline");
											}
											
											var fontSize:int = 9;
											if(docItemsingle.font_size > 0){
												fontSize =docItemsingle.font_size;
											}
											ll1single.setStyle("fontSize", fontSize) ;
											
											var field_size:int = 10 ;
											var wordWrap:Boolean = false ;
											if(docItemsing2.wordWrap) {
												wordWrap = docItemsing2.wordWrap ;
												field_size = docItemsing2.field_size ;
											}
											
											if(wordWrap){
												ll1sing.setStyle("lineBreak", "toFit") ;
												ll1sing.width = field_size * screenDpi / 25.4;
											}

											switch(docItemsingle.field_alignment){
												case "2":
													ll1single.setStyle("textAlign", "center") ;
													break;
												case "1":
													ll1single.setStyle("textAlign", "end") ;
													break;
											}
											ll1single.setStyle("verticalAlign","middle");
											ll1single.text=docItemsingle.text;
											ll1single.height=this.calculateTextLength(docItemsingle.text,"宋体",fontSize)+4;
											curLeft = curLeft+docItemsingle.skipword*dpi;
											ll1single.left=curLeft;
											curLeft = curLeft+ll1single.width;
											lineHGroup.addElement(ll1single);
											if(docItemsingle.newline=="1"){
												bco1.addElement(lineHGroup);
											}
										}
									}
								}
								
								var dbies1single:Object = dbids[i].single;
								var dbiesProssingle:Array= dbies1single.property;
								for(var lsingle:int=0;lsingle<dbiesProssingle.length;lsingle++){
									var dobjsingle:Object= curlFieldObj[dbiesProssingle[lsingle].name];
									if(dobjsingle.constructor === Label){
										(Label(dobjsingle)).text=dbiesProssingle[lsingle].value;
									}
								}
								
							}
						}else{
							if(bco1==null){
								bco1 = new BorderContainer();
								
								if(rotation != 0) {
									bco1.rotation = rotation ;
								}
								if(rotation == 90 || rotation == -90) {
									bco1.maxHeight = printJob.pageWidth ;
									bco1.maxWidth = printJob.pageHeight ;
									bco1.width = printJob.pageHeight ;
									bco1.height = printJob.pageWidth ;
								} else {
									bco1.maxHeight = printJob.pageHeight ;
									bco1.maxWidth = printJob.pageWidth ;
									bco1.width=printJob.pageWidth ;
									bco1.height=printJob.pageHeight ;
								}
								
								if(pageHeight != 0) {
									printJob.pageHeight = pageHeight * screenDpi / 25.4 ;
									bco1.maxHeight = pageHeight * screenDpi / 25.4 ;
									bco1.height = pageHeight * screenDpi / 25.4 ;
								}
								
								if(pageWidth != 0) {
									printJob.pageWidth = pageWidth * screenDpi / 25.4 ;
									bco1.maxWidth = pageWidth * screenDpi / 25.4 ;
									bco1.width = pageWidth * screenDpi / 25.4 ;
								}
								
								bco1.setStyle("borderVisible", false) ;
								
								if(taskformat.item.constructor === Array){
									var docItemssing:Array = taskformat.item;
									for(var ksing:uint=0;ksing< docItemssing.length;ksing++){
										var docItemsing2:Object =  docItemssing[ksing];
										
										var ll1sing:Label = new Label();
										if(docItemsing2.field_name){
											ll1sing.name=docItemsing2.field_name;
										}
										if(docItemsing2.under_line==true){
											ll1sing.setStyle("textDecoration","underline");
										}
										
										switch(docItemsing2.style){
											case '1':
												ll1sing.setStyle("fontWeight","bold");
												break;
											case '2':
												ll1sing.setStyle("fontStyle","italic");
												break;
											case '3':
												ll1sing.setStyle("fontStyle","italic");
												ll1sing.setStyle("fontWeight","bold");
												break;
										}
										
										var fontSizesing:int = 9;
										var fontName:String= "宋体";
										if(docItemsing2.font_size > 0){
											fontSizesing =docItemsing2.font_size;
										}
										ll1sing.setStyle("fontSize", fontSizesing) ;
										if(docItemsing2.font_name){
											fontName = docItemsing2.font_name;
										}
										bco1.setStyle("fontFamily",fontName);
										ll1sing.setStyle("fontFamily",fontName);
										
										var field_size2:int = 10 ;
										var wordWrap2:Boolean = false ;
										if(docItemsing2.wordWrap) {
											wordWrap2 = docItemsing2.wordWrap ;
											field_size2 = docItemsing2.field_size ;
										}
										
										if(wordWrap2){
											ll1sing.setStyle("lineBreak", "toFit") ;
											ll1sing.width = field_size2 * screenDpi / 25.4;
										}
										switch(docItemsing2.field_alignment){
											case "2":
												ll1sing.setStyle("textAlign", "center") ;
												break;
											case "1":
												ll1sing.setStyle("textAlign", "end") ;
												break;
										}
										ll1sing.setStyle("verticalAlign","middle");
										ll1sing.text=docItemsing2.text;
										//ll1sing.height=calculateTextLength(docItemsing.text,fontName,fontSizesing)+dpi;
										ll1sing.x = docItemsing2.skipword * screenDpi / 25.4 ;
										ll1sing.y = docItemsing2.newline * screenDpi / 25.4 ;
										
										bco1.addElement(ll1sing) ;
									}
								}
								
								var tasklines:Object = null;
								if(task1.format.constructor === Array && task1.format.length > 0){
									tasklines = task1.format[0];
								} else {
									tasklines = task1.format;
								}
								
								if(tasklines) {
									if(tasklines.lines.constructor === Array && tasklines.lines.length > 0){
										tasklines = tasklines.lines[0];
									} else {
										tasklines = tasklines.lines;
									}
								}
								
								if(tasklines && tasklines.line.constructor === Array) {
									var docLines:Array = tasklines.line;
									for (var lineIndex:int = 0; lineIndex < docLines.length; lineIndex++) 
									{
										var docLine2:Object =  docLines[lineIndex];
										
										var line:Line = new Line() ;
										if(docLine2.xFrom) {
											line.xFrom = docLine2.xFrom * screenDpi / 25.4 ;
										} else {
											line.xFrom = 0;
										}
										
										if(docLine2.xTo) {
											line.xTo = docLine2.xTo * screenDpi / 25.4 ;
										} else {
											line.xTo = 0;
										}
										
										if(docLine2.yFrom) {
											line.yFrom = docLine2.yFrom * screenDpi / 25.4 ;
										} else {
											line.yFrom = 0;
										}
										
										if(docLine2.yTo) {
											line.yTo = docLine2.yTo * screenDpi / 25.4 ;
										} else {
											line.yTo = 0;
										}
										
										var lineColor:uint = 0 ;
										if(docLine2.color) {
											lineColor = docLine2.color ;
										}
										
										var lineWeight:Number = 1 ;
										if(docLine2.weight) {
											lineWeight = docLine2.weight ;
										}
										
										//line.stroke = new SolidColorStroke(lineColor, lineWeight) ;
										
										bco1.addElement(line) ;
									}
								}
								
								if(rePrintLabel && rePrintLabel != "") {
									var reprtArray:Array = rePrintLabel.split("|") ;
									if(reprtArray && reprtArray.length > 0) {
										var reprtLen:int = reprtArray.length ;
										
										var rell1sing:Label = new Label();
										rell1sing.name="RE_PRINT_LABEL";
										
										if(reprtLen > 0) {
											rell1sing.text = reprtArray[0] ;
										}
										
										if(reprtLen > 2) {
											rell1sing.setStyle("fontSize", reprtArray[2]) ;
										} else {
											rell1sing.setStyle("fontSize", "9") ;
										}
										rell1sing.setStyle("fontFamily","宋体");
	//											rell1sing.setStyle("wordWrap",true);
										rell1sing.setStyle("verticalAlign","middle");
										
										if(reprtLen > 3) {
											rell1sing.x = bco1.width - reprtArray[3] ;
										} else {
											rell1sing.x = bco1.width - 50 ;
										}
										
										if(reprtLen > 4) {
											rell1sing.y = reprtArray[4] ;
										} else {
											rell1sing.y = 20 ;
										}
										
										bco1.addElement(rell1sing) ;
									}
								}
							}
						}
					}
					
					if(bco1){
						bco1.invalidateSize() ;
						bco1.validateNow() ;
						// FlexGlobals.topLevelApplication.addElement(bco1);
						// printJob.addObject(bco1,FlexPrintJobScaleType.NONE);
						// FlexGlobals.topLevelApplication.removeElement(bco1);
					}
					
					// Send the job to the printer.
					// printJob.send();
					}
					
				}
			}
		  }
		}
    }
    setValueWithObject(_data,perData,Opened){
		let _valueObject = {};
		let prodIndex =0;
		let prodTotal=0;
		let rotation = 0;
		let pageWidth = 0;
		let pageHeight = 0;
		let rePrintLabel = '';
		if(_data){
			let task1 = null;
			if(_data.tasks.constructor === Array && _data.tasks.length>0){
				task1=_data.tasks[0];
				if(task1.docs.constructor === Array && task1.docs.length>0){
					task1 = task1.docs[0];
				}else{
					task1 = task1.docs;
				}
				
				if(task1.data.constructor === Array && task1.data.length>0){
					task1 = task1.data[0];
				}else{
					task1 = task1.data;
				}
				
			}else{
				task1=_data.tasks;
				if(task1.docs.constructor === Array && task1.docs.length>0){
					task1 = task1.docs[0];
				}else{
					task1 = task1.docs;
				}
				
				if(task1.data.constructor === Array && task1.data.length>0){
					task1 = task1.data[0];
				}else{
					task1 = task1.data;
				}
			}
			
			if(task1&&task1.property.constructor === Array && task1.property.length>0) {
				let dbids:Array =  task1.property;
				for(let i:int=0;i<dbids.length;i++){
					prodIndex=1;
					prodTotal=0;
					let dbid:String = dbids[i].name;
					let prtDataProvider = [];
					if(dbids[i].many){
						if(dbids[i].list.constructor === Array){
							_valueObject[dbid]={};
							let dbies = dbids[i].list;
							if(dbies.length>0){
								
								if(dbies[0].property.constructor === Array){
									let cols:Array = dbies[0].property;
									let colNames:Array = new Array(cols.length); 
									
									for(let j:uint=0;j<cols.length;j++){
										let dgc:DataGridColumn = new DataGridColumn();
										dgc.dataField = cols[j].name;
										colNames[j]=dgc;
									}
									
									_valueObject[dbid].columns = colNames;
									
									for(let n:int=0;n<dbies.length;n++){
										let cols2:Array = dbies[n].property;
										let itemd:Object = new Object();
										for(let m:int=0;m<cols2.length;m++){
											let colName:String = cols[m].name;
											itemd[colName]=cols2[m].value;
										}
										prodTotal += prodIndex*50;
										prodIndex = prodIndex++;
										prtDataProvider.push(itemd);
									}
									_valueObject[dbid].dataProvider=prtDataProvider;
								}else{
									
								}
							}
						}
					}else{
						
					}
				}
			}
				
			task1 = null;
			let taskformat = null;
			let taskdata = null;
			if(_data.tasks.constructor === Array && _data.tasks.length>0){
				task1=_data.tasks[0];
				if(task1.docs.constructor === Array && task1.docs.length>0){
					task1 = task1.docs[0];
				}else{
					task1 = task1.docs;
				}
				
				if(task1.data.constructor === Array && task1.data.length>0){
					taskdata = task1.data[0];
				}else{
					taskdata = task1.data;
				}
				
				if(task1.format.constructor === Array && task1.format.length>0){
					taskformat = task1.format[0];
				}else{
					taskformat = task1.format;
				}
				
				if(taskformat && taskformat.hasOwnProperty("note")) {
					this.props.commonProps.promptMessage = taskformat.note ;
				}
				
				if(taskformat && taskformat.hasOwnProperty("rotation")) {
					rotation = taskformat.rotation ;
				}
				
				if(taskformat && taskformat.hasOwnProperty("pageWidth")) {
					pageWidth = taskformat.pageWidth ;
				}
				
				if(taskformat && taskformat.hasOwnProperty("pageHeight")) {
					pageHeight = taskformat.pageHeight ;
				}
				
				if(taskformat.content.constructor === Array && taskformat.content.length>0){
					taskformat = taskformat.content[0];
				}else{
					taskformat = taskformat.content;
				}
				
			}else{
				task1=_data.tasks;
				if(task1.docs.constructor === Array && task1.docs.length>0){
					task1 = task1.docs[0];
				}else{
					task1 = task1.docs;
				}
				
				if(task1.data.constructor === Array && task1.data.length>0){
					taskdata = task1.data[0];
				}else{
					taskdata = task1.data;
				}
				
				if(task1.format.constructor === Array && task1.format.length>0){
					taskformat = task1.format[0];
				}else{
					taskformat = task1.format;
				}
				
				if(taskformat && taskformat.hasOwnProperty("note")) {
					this.props.commonProps.promptMessage = taskformat.note ;
				}
				
				if(taskformat && taskformat.hasOwnProperty("rotation")) {
					rotation = taskformat.rotation ;
				}
				
				if(taskformat && taskformat.hasOwnProperty("pageWidth")) {
					pageWidth = taskformat.pageWidth ;
				}
				
				if(taskformat && taskformat.hasOwnProperty("pageHeight")) {
					pageHeight = taskformat.pageHeight ;
				}
				
				if(taskformat.content.constructor === Array && taskformat.content.length>0){
					taskformat = taskformat.content[0];
				}else{
					taskformat = taskformat.content;
				}
			}
			this.props.commonProps.task1 = task1 ;
			this.props.commonProps.taskdata = taskdata ;
			this.props.commonProps.taskformat = taskformat ;
			this.props.commonProps._valueObject = _valueObject ;
			this.props.commonProps._data = _data;
			this.props.commonProps.pageHeight=pageHeight;
			this.props.commonProps.pageWidth = pageWidth;
			this.props.commonProps.rotation = rotation;

			if(_data.RE_PRINT_LABEL) {
				rePrintLabel = _data.RE_PRINT_LABEL ;
			}
			this.props.commonProps.rePrintLabel = rePrintLabel;
		}

    	this.setState({
    		show: Opened,
    	})
    }
    calculateTextLength(text, fontFamily, fontSize) {
		var textFormat:UITextFormat = textFormat = new UITextFormat();
		textFormat.antiAliasType="advanced";
		textFormat.gridFitType="pixel";
		textFormat.font=fontFamily;
		textFormat.size=fontSize;
		
		return textFormat.measureText(text).height ;
	}
    render() {
    	let promptMessage ='';
    	if(this.props.commonProps.promptMessage == null || this.props.commonProps.promptMessage == "") {
            promptMessage = "是否打印凭证" ;
        } else {
            promptMessage = "请放入打印凭证[" + this.props.commonProps.promptMessage + "]" ;
        }
        return (
	    	<Modal
	                show={this.state.show}
	                onHide={this.hideModal}
	                aria-labelledby="contained-modal-title-lg"
	                bsSize="large"
	            >
	            <Modal.Header closeButton>
	                <Modal.Title id="contained-modal-title-lg">打印确认:{promptMessage}</Modal.Title>
	            </Modal.Header>
	            <Modal.Body>
	                <div className='PrintEBillPayPrint08' id='printData'>
					    <div className='PrintEBillPayPrint08_jzrq'>记账日期:</div>
					    <div className='PrintEBillPayPrint08_NBRMNCUR'  name="NBRMNCUR"></div>
					    <div x="80" y="65" text="" id="NDATEACC" name="NDATEACC" fontSize="9"></div>
					    <div width="525" height="301" borderColor="#999999" fontSize="9">
					    	<div left="110" top="8">收款单位</div>
					    	<div x="11" y="34">全  称</div>
					    	<div x="11" y="59">账  户</div>
					    	<div x="11" y="84">开户行</div>

					    	<div x="376"  y="8">付款单位</div>
					    	<div x="277" y="34">全  称</div>
					    	<div x="277" y="59">账  户</div>
					    	<div x="277" y="84">开户行</div>
					    </div>
  					</div>
	            </Modal.Body>
	            <Modal.Footer>
			        <Button bsStyle="primary" onClick={this.print} >打印</Button>
			        <Button onClick={this.hideModal}>取消</Button>
			    </Modal.Footer>
	         </Modal>
	    )
    }
}

PrintPromptDialog.propTypes = {
    ClazzType:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

PrintPromptDialog.defaultProps = {
    ClazzType:'PrintPromptDialog',
    commonProps:{},
};

export default PrintPromptDialog; 