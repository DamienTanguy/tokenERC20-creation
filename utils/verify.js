const { run } = require("hardhat");

module.exports = {
	async verify(_address,_args) {
		try {
			await run("verify:verify",{
				address: _address,
				contructorArguments: _args
			})
		}
		catch(error) {
		  console.error(error);
		  if(error.message.toLowerCase().includes("already verified")){
		  	console.log("Already Verified");
		  }else{
		  	console.log(e);
		  }
		};
		
	}
}
