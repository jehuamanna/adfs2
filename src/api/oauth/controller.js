const logger = require('utils/logger');
const ExpressError = require('utils/expressError');

const oauth = (req, res, next) => {
  try {

    logger.info('Called OAuth endpoint');
    res.send('oauth home')
    return res.sendStatus(200);
  } catch (error) {

    return res.send(error)
  }
};

const oauthAuth = (req, res, next) => {
  try {

    logger.info('Called OAuth endpoint');

    const Empcode = parseJwt(token).Empcode
    console.log(Empcode)
    console.log(req.user)
    const html_ = `
        <div id="output"> </div>
        <script>
        function sendTokenToParent(token) {
            /* window.opener.postMessage(token, window.location.origin); */
            /*window.opener.postMessage(token, "https://testingadfs-bhgjyz8fh-jehus-projects.vercel.app/"); */
            /* window.opener.postMessage(token, "https://dev-frplus.dtdc.com/"); */
            window.opener.postMessage(token, "http://localhost:1234");
            window.opener.postMessage(token, "https://frplus-uat.dtdc.com");
            window.opener.postMessage(token, "https://frplus-dev.dtdc.com");
            window.opener.postMessage(token, "https://dev-frplus.dtdc.com");
            window.close();
            console.log(token);
        }

        const url = new URL(window.location.href);
    
        // Get the query parameters
        const params = new URLSearchParams(url.search);
    
        // Get specific parameters
        const param = params.get('token');
    
        // Send the token to the parent window
        sendTokenToParent(param);
        console.log(token);
    
        // Output the parameters
        document.getElementById('output').innerHTML = \`
          <p>Token: \${param}</p>
        \`;
        </script>
    `
    res.send(html_)
    res.sendStatus(200)
  } catch (error) {

    return res.send(error)
  }
};

module.exports = {
  oauth,
  oauthAuth
};