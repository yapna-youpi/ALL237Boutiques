const serveiceId={
	cashOutOrange: 'CASHOUTOMCM',
	cashOutMtn: 'CASHOUTMTNCM',
	cashInOrange: 'CASHINOMCM',
	cashInMtn: 'CASHINMTNCM',
}
const getBalance=()=>{
    fetch("https://api.gutouch.com/v1/IPERD3298/get_balance", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Basic TVROOnBhc3Nlcg==",
        },
        "mode": "no-cors",
        "body": "{\"partner_id\":\"CM2923\",\"login_api\":\"672529240\",\"password_api\":\"0000\"}"
    })
    .then(response => { console.log(response)})
    .catch(err => {
        console.error(err);
    });
}

const getStatus=()=>{
	fetch("https://api.gutouch.com/v1/IPERD3298/check_status", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": "Basic TVROOnBhc3Nlcg=="
		},
		"body": "{\"partner_id\":\"CM2923\",\"partner_transaction_id\":\"_8EqIfFUgqpKkNFtEFdjhfjHLvZcd0_7q17MIxA63t2GfTZqn5528oiuy5\",\"login_api\":\"672529240\",\"password_api\":\"0000\"}"
	})
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.error(err);
	})
}

const cashIn=()=>{
	fetch("https://api.gutouch.com/v1/IPERD3298/cashin", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": "Basic TVROOnBhc3Nlcg=="
		},
		"body": "{\"service_id\":\"CASHINOMCM\",\"recipient_phone_number\":\"655454994\",\"amount\":3000,\"partner_id\":\"CM2923\",\"partner_transaction_id\":\"2621230011111233135232g2é99po\",\"login_api\":\"672529240\",\"password_api\":\"0000\",\"call_back_url\":\"gutouch.com\"}"
	})
	.then(response => {
		console.log(response);
	})
		.catch(err => {
		console.error(err);
	})
}

const cashOut=()=>{
	fetch("https://api.gutouch.com/v1/IPERD3298/cashout_request", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": "Basic RTU0NkE5NTE2Rjk5QzVBQzFEOTNFOTA5MjczMjY3MURCRUQ1QjVDNDM1NzA2RkE2Nzg0MzUyRTZCQjAwMjA2QToxRUUyQTU1Q0I4RDE3MzREMkZERjQwNUM0OUQxNkFDNDczMUIxREZEQzA3NzlGRThBRjQwREExOUIzMkZFRUFF"
		},
		"body": "{\"service_id\":\"CASHOUTMTNCM\",\"recipient_phone_number\":\"651851676\",\"amount\":300,\"partner_id\":\"CM2923\",\"partner_transaction_id\":\"26212300cjbdc11jdhjfjhg11123m13532é259oewehjojkoi05\",\"login_api\":\"672529240\",\"password_api\":\"0000\",\"call_back_url\":\"gutouch.com\"}"
	})
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.error(err);
	})
}



export { getBalance, getStatus, cashIn, cashOut }