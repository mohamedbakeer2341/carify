export const sendActivationLinkTemp = ({activationLink,name})=>{
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <title>Account Activation Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .email-container {
                width: 80%;
                margin: 0 auto;
                padding: 20px;
                background-color: #f7f7f7;
                border-radius: 5px;
                box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            }
            .email-container h1 {
                color: #333;
            }
            .email-container p {
                color: #666;
            }
            .email-container a {
                display: inline-block;
                color: #fff;
                background-color: #494C4C;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 3px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>Welcome to Our Website!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for registering. Please click the link below to activate your account:</p>
            <a href=${activationLink}>Activate Account</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best,</p>
            <p>Your Website Team</p>
        </div>
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
        <title>Password Reset Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .email-container {
                width: 80%;
                margin: 0 auto;
                padding: 20px;
                background-color: #f7f7f7;
                border-radius: 5px;
                box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            }
            .email-container h1 {
                color: #333;
            }
            .email-container p {
                color: #666;
            }
            .email-container .code {
                display: inline-block;
                color: #fff;
                background-color: #494C4C;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 3px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>Password Reset Request</h1>
            <p>Dear ${name},</p>
            <p>We received a request to reset your password. Here is your password reset code:</p>
            <p class="code">${forgetCode}</p>
            <p>Please enter this code in the provided field to reset your password. If you did not request this, please ignore this email.</p>
            <p>Best,</p>
            <p>Carify</p>
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