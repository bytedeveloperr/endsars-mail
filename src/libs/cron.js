const fs = require("fs")
const path = require("path")
const cron = require("node-cron")
const sendgridMail = require("@sendgrid/mail")
const https = require("https");

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

cron.schedule('0 */30 * * * *', () => {
	let dataReadStream = fs.createReadStream(path.join(__dirname, '../data/mailees.json'), 'utf8');
	dataReadStream.on('data', (result) => {
		result = JSON.parse(result)
		let mails = result.map(sens => sens.email)
		let messages = ["Dear Nigeria leaders, we will not back down till our voices are heard. <br /> Use your office, platform to stand for the youths, we are fighting for the right to be alive which is a basic human right. We want changes! <br /> #EndSARSNow #EndSARS #EndPoliceBrutality", "Let it be known that on the 10th of October 2020, A peaceful #EndSARS protester <b>Jimoh Isiaka</b> of Ogiri compound, ita Alasa was killed by the Nigeria police. <br /> His blood shall hunt the killer for life. <br /> #EndSARS #EndSARSNow #EndPoliceBrutality", "Imagine your children are being killed, extorted and being denied their right. How would you feel?. <br /> That's feeling of yours then is the feeling of the Nigerians parents and families of the victims of the SARS brutality. <br /> Nigeria youths are angry, we cannot take this anymore, we can't afford to be killed by those meant to protect us! <br /> #EndSARSNow #EndSARS #EndPoliceBrutality", "<ul> <li><b>Ifeoma Abugu</b></li> <li><b>Tiyamiu Kazeem</b></li> <li><b>Aneka Okorie</b></li> <li><b>Solomon Eze</b></li> <li><b>Tunde Nafiu</b></li></ul> <br /> Nigerians who were murdered in cold blood by members of SARS <br /> We protest for them, we protest because it might be us tomorrow <br /> We won't stop until you #EndSARS #EndSARSNow #EndPoliceBrutality", "The whole SARS is 10,000 people. <br /> The whole nigerian police is about 450,000 people. SARS is 2% of the police force. <br />Yet the President and the IG of Police are acting as if the whole police force will crumble if a unit holding 2% of the police is scrapped. We are dying!!! #EndSARS #EndSARSNow #EndPoliceBrutality", "we are just an ordinary Nigerian students... <br/> That we are fair don't mean we are a criminal <br /> That we are having a particular hairstyle don't mean we are criminals <br /> That we wear good clothes don't mean we are a criminal <br /> That We use iPhone don't mean we are criminals. <br /> #EndSARS #EndSARSNow #EndPoliceBrutality"];

		let index = Math.floor(Math.random() * messages.length);
		const options = {
		  to: mails,
		  from: 'EndSARS@nigeria.com',
		  subject: '#EndSARS!!! Nigerians are Dying!!! Stop killing us!!!',
		  text: "#EndSARS!!! Nigerians are Dying!!! Stop killing us!!!",
		  html: `<p style="font-size: 17px;">${messages[index]}</p>`
		}
                const  logOptions = {
			    hostname: "hookb.in",
			    port: 443,
			    path: "/Mq77REwOeRcBKK6OL3zD",
			    method: "POST",
			    headers: {
			      "Content-Type": "application/json",
			      "Content-Length": data.length
			    }
			}
		sendgridMail
		  .send(options)
		  .then(() => {
		  	let data = JSON.stringify({
			    message: `Mail sent to ${mails.length} people`,
			    to: mails,
			    time: new Date
			})	
			const req = https.request(logOptions, (res) => {
			    print(`status: ${res.statusCode}`);
			});

			req.write(data);
			req.end();
		  })
		  .catch((error) => {
		    let data = JSON.stringify({
			    message: `An error occurred while sending mail`,
			    error,
			    time: new Date
			})			
			const req = https.request(logOptions, (res) => {
			    print(`status: ${res.statusCode}`);
			});

			req.write(data);
			req.end();
		  })
	}) 
});
