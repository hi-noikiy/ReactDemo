class SignCFCA  {
	/**
	 * 加密登录信息,登录签名
	 * 
	 * @param cadn   证书序列号
	 * @param type   加密方式 2为CA加密 ，6为兴业CA加密
	 * @param payer_acc   付款账号
	 * @param randomCode   随机数
	 * @param lower   付款金额
	 * @param enterDate   付款日期
	 * @param payee   收款单位
	 * @param payeeAccount   收款账号
	 */
	signValueByCFCA(txcode,cadn,type,payer_acc,randomCode,lower,enterDate,payee,payeeAccount) {
		type = parseInt(type,10);
		let bSelectUserCerts = false;
		let indata = "";
		if (cadn == null) {
			alert("您未绑定证书！");
		} else {
			try {
				if (type === 6) {
					let BlockHouse1 = document.getElementById("BlockHouse1");
					bSelectUserCerts = BlockHouse1.CFCA_InitCertAppContext(true,
							cadn); // cfca 1.0
					if (bSelectUserCerts === false) {
						alert("没有取到证书！");
					}
				}else if (type === 2) {
					let CryptoAgency = document.getElementById("CryptoAgency");
					// 选择证书
					// 1-目标证书中主题DN中所包含的字符串，作为该筛选条件选出证书
					// 2-目标证书中颁发者DN中所包含的字符串，作为该筛选条件选出证书
					CryptoAgency.SelectSignCertificate("", "");
					// 签名
					//var Signature = CryptoAgency.SignMessage("888888", "SHA-1");
					// 验签
					//var content = CryptoAgency
					//		.VerifyMessageSignaturePKCS7(Signature);
					let cadn2 = CryptoAgency.GetSignaturePublicCertSN();
					if (cadn2 !== cadn) {
						alert("没有取到证书或选择证书和绑定证书不一致!不能付款!");
						bSelectUserCerts=false;
					}else{
						bSelectUserCerts=true;
					} 
				}
				if(bSelectUserCerts){
					/**
					 * 验签：
					 * 	付款账号+随机数+付款金额+付款日期+收款单位+收款账号形成一个字符串保存在源（sourceCode）中
					 */
					let code =  payer_acc;
					code = code.concat(randomCode);
					let dataje =  lower ;
					let je = "";
					if (dataje.indexOf(".") === -1)
						dataje = dataje.concat(".00");
					if (dataje.indexOf(".") < dataje.length - 3)
						dataje = dataje.substring(0, dataje.indexOf(".") + 3);
					if (dataje.indexOf(".") === dataje.length - 1)
						dataje = dataje.concat("00");
					if (dataje.indexOf(".") === dataje.length - 2)
						dataje = dataje.concat("0");
					for (let i = 0; i < dataje.length; i++) {
						let temp = dataje.substring(i, i + 1);
						if (temp !== ",") {
							je = je.concat(temp);
						}
					}
					while (je.length < 14) {
						je = "0" + je;
					}
					code = code.concat(je);
					let rqdata = "";
					for (let i = 0; i < enterDate.length; i++) {
						let temprq = enterDate.substring(i, i + 1);
						if (temprq !== "-") {
							rqdata = rqdata.concat(temprq);
						}
					}
					code = code.concat(rqdata);
					code = code.concat( payee );
					code = code.concat( payeeAccount );
					
		
					if (code !== "") {
						try {
							if (type === 6) {
								let BlockHouse1 = document.getElementById("BlockHouse1");
								indata = BlockHouse1.CFCA_SignData(code); // cfca 1.0
							}
							if (type === 2) {
								let CryptoAgency = document.getElementById("CryptoAgency");
								// 签名
								indata = CryptoAgency.SignMessage(code, "SHA-1");
							}
							
						} catch (e) {
							alert("证书使用有错误" + e.message);
						}
					} else {
						alert("没有待签名的数据");
					}
				}
			} catch (e) {
				alert("没有取到证书！不能付款！");
			}
		}
		
		return {indata:indata,txcode:txcode};
	}



	/**
	 * --CFCA 登陆时调用方法 --type 为加密方式 2为CA加密 ，6为兴业CA加密
	 */
	listAllCFCACert(type) {
		let cadn = "";
		let code = "";
		
		let CertSubjectDN="";
		type = parseInt(type,10);
		if (type === 6) {
			let BlockHouse1 = document.getElementById("BlockHouse1");
			BlockHouse1.CFCA_SelectUserCerts(true);
			cadn = BlockHouse1.CFCA_GetCertCN(true);
			if (cadn === null || cadn === "") {
				alert("您未选择证书！");
			} else {
				try {
					BlockHouse1.CFCA_InitCertAppContext(true,cadn);
					code = String(parseInt(Math.random() * 10000000000,10));
					try {
						BlockHouse1.CFCA_SignData(code);
					} catch (e) {
						alert("证书使用有错误或证书不存在不能登陆！");
					}
				} catch (e) {
					alert("没有取到证书！不能登陆");
				}
			}
		} else if (type === 2) {
			let CryptoAgency = document.getElementById("CryptoAgency");
			try {
				// 选择证书
				// 1-目标证书中主题DN中所包含的字符串，作为该筛选条件选出证书
				// 2-目标证书中颁发者DN中所包含的字符串，作为该筛选条件选出证书
				CertSubjectDN = CryptoAgency.SelectSignCertificate("", "");
				// 签名
				var Signature = CryptoAgency.SignMessage("888888", "SHA-1");
				// 验签
				CryptoAgency.VerifyMessageSignaturePKCS7(Signature);
				cadn = CryptoAgency.GetSignaturePublicCertSN();
			} catch (e) {
				console.log(e);
				var LastErrorDesc = CryptoAgency.GetLastErrorDesc();
				alert(LastErrorDesc);
			}
		}
		
		return {cadn:cadn,CertSubjectDN:CertSubjectDN};
	}

	getCFCAVersion(i) {
		let ver = null;
		switch (i) {
		case 1:
			ver = "1,2,2,3";
			break;
		case 2:
			ver = "2,0,0,3";
			break;
		case 3:
			ver = "1,6,0,1";
			break;
		case 4:
			ver = "2,1,0,2";
			break;
		case 5:
			ver = "3,0,0,20";
			break;
		default:
			ver = "1,2,2,3";
			break;
		}
		return ver;
	}

}

export default SignCFCA;