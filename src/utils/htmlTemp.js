export const sendActivationLinkTemp = ({activationLink,name})=>{
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <title>Account Activation</title>
        <style>
            .header {
                background-color: #007bff;
                color: white;
                padding: 20px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
            }
    
            .button {
                display: inline-block;
                background-color: #007bff;
                color: white;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin: 10px 0;
            }
    
            .button-container {
                text-align: center;
            }
    
            .link {
                color: #007bff;
                text-decoration: none;
            }
    
            .link:hover {
                color: #0056b3;
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="header">Account Activation</td>
            </tr>
            <tr>
                <td>
                    <h2>Hello ${name},</h2>
                    <p>Thank you for registering on our site. Please click on the button or the link below to activate your account:</p>
                    <div class="button-container">
                        <a href="${activationLink}" class="button">Activate Account</a>
                    </div>
                    <p>Or copy and paste this link into your browser:</p>
                    <p><a href="${activationLink}" class="link">${activationLink}</a></p>
                    <p>If you did not register on our site, please ignore this email.</p>
                    <p>Best,</p>
                    <strong>Carify</strong>
                </td>
            </tr>
        </table>
    </body>
    </html>    
    `
  return html
}
export const accountActivatedTemp = (name)=>{
  const html = `<!DOCTYPE html>
  <html>
  <head>
      <title>Account Activated</title>
      <style>
          body {
              font-family: Arial, sans-serif;
          }
          .container {
              width: 80%;
              margin: auto;
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 5px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              text-align: left;
          }
          .top-bar {
            background-color: #007bff;
            height: 60px;
            color: white;
            text-align: center;
            padding: 20px 0 0  ;
            font-weight: bold;
            font-size: 40px;
            width: 100%;
        }
          .button-container {
              width: 100%;
              text-align: center;
          }
          a.button {
              display: inline-block;
              color: white;
              background-color: #007bff;
              padding: 12px 20px;
              margin: 20px 0;
              text-decoration: none;
              border-radius: 5px;
          }
          a.link {
              color: #007bff;
              text-decoration: none;
          }
          a.link:hover {
              color: #0056b3;
              text-decoration: underline;
          }
          strong {
              font-size:20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="top-bar">Account Activated</div>
          <h2>Hello ${name},</h2>
          <p>Your account has been successfully activated! You can now log in and start using our services.</p>
          <p>If you did not activate this account, please contact our support team immediately.</p>
          <p>Best,</p>
          <strong>Carify</strong>
      </div>
  </body>
  </html>`
  return html
}

export const sendForgetCodeTemp = ({name,forgetCode})=>{
    const html =`<!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                width: 80%;
                margin: auto;
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 5px;
            }
            .top-bar {
                background-color: #007bff;
                height: 60px;
                color: white;
                text-align: center;
                padding: 20px 0 0  ;
                font-weight: bold;
                font-size: 40px;
                width: 100%;
            }
            .code {
                font-size: 42px;
                color: #007bff;
                margin: 10px auto;
                text-align: center;
                background-color: #e9ecef;
                padding: 20px;
                border-radius: 5px;
                display: inline-block;
            }
            .center {
                display: flex;
                justify-content: center;
            }
            .team {
                font-size: 20px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="top-bar">Password Reset Code</div>
            <h2>Hello, ${name}</h2>
            <p>Your forget code is:</p>
            <div class="center">
                <div class="code">${forgetCode}</div>
            </div>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best,</p>
            <p class="team">Carify</p>
        </div>
    </body>
    </html>
    `
    return html
}

export const passwordResetTemp = (name)=>{
  const html = `<!DOCTYPE html>
  <html>
  <head>
      <title>Password Reset</title>
      <style>
          body {
              font-family: Arial, sans-serif;
          }
          .container {
              width: 80%;
              margin: auto;
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 5px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              text-align: left;
          }
          .top-bar {
            background-color: #007bff;
            height: 60px;
            color: white;
            text-align: center;
            padding: 20px 0 0  ;
            font-weight: bold;
            font-size: 40px;
            width: 100%;
        }
          .button-container {
              width: 100%;
              text-align: center;
          }
          a.button {
              display: inline-block;
              color: white;
              background-color: #007bff;
              padding: 12px 20px;
              margin: 20px 0;
              text-decoration: none;
              border-radius: 5px;
          }
          a.link {
              color: #007bff;
              text-decoration: none;
          }
          a.link:hover {
              color: #0056b3;
              text-decoration: underline;
          }
          strong {
              font-size:20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="top-bar">Password Reset</div>
          <h2>Hello ${name},</h2>
          <p>Your password has been reset sucessfully! You can now log in using new password.</p>
          <p>If you did not reset password, please contact our support team immediately.</p>
          <p>Best,</p>
          <strong>Carify</strong>
      </div>
  </body>
  </html>`
  return html
}

export const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}