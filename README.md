# POC 1 - Manual / Automated Channel Creation in Slack

This guide provides detailed instructions on how to create a Slack app that can manage both public and private channels within a workspace. The app will have permissions to list users, view their email addresses, and manage channels. Follow the steps below to set up your app and configure it with the necessary permissions.

## Table of Contents

1. [Create the Slack App](#create-the-slack-app)
2. [Retrieve the Signing Secret](#retrieve-the-signing-secret)
3. [Customize App Display Information](#customize-app-display-information)
4. [Configure OAuth Scopes](#configure-oauth-scopes)
5. [Additional Resources](#additional-resources)

## Create the Slack App

1. **Navigate to the Slack API Apps Page**:
   Go to the [Slack API Apps page](https://api.slack.com/apps) and log in with your Slack credentials if necessary.

2. **Click on 'Create New App'**:
   - You will be prompted to choose a method for creating your app. Select "From scratch".
   
3. **Provide App Details**:
   - **App Name**: Enter a unique name for your app. For example, "Channel Manager".
   - **Pick a Workspace**: Select the workspace where you want the app to operate. Note that this cannot be changed later.

4. **Click 'Create App'**:
   - Your new app will be created and you will be redirected to the app management dashboard.

## Retrieve the Signing Secret

1. **Go to 'App Credentials'**:
   - In the app management dashboard, navigate to the "Basic Information" section.
   
2. **Locate the Signing Secret**:
   - Under "App Credentials", you will find your "Signing Secret". Copy this value as it will be needed for verifying requests from Slack.

## Customize App Display Information

1. **Navigate to 'Display Information'**:
   - In the app management dashboard, click on "Display Information" in the sidebar.

2. **Update the Display Settings**:
   - **App Name**: You can change the app name here if desired.
   - **App Icon**: Upload a custom logo for your app.
   - **App Description**: Add a brief description of what your app does.
   - **App Background Color**: Customize the background color to match your branding.

3. **Save Changes**:
   - Ensure you click the "Save" button after making any changes to apply them.

## Configure OAuth Scopes

1. **Go to 'OAuth & Permissions'**:
   - In the app management dashboard, navigate to the "OAuth & Permissions" section.

2. **Scroll Down to 'Scopes'**:
   - Under "Scopes", you can define the permissions your app will request from users.

3. **Add Required Scopes**:
   - Click on "Add an OAuth Scope" and add the following scopes:
     - `groups:write`: Manage private channels, including creating new ones.
     - `users:read`: View the list of users in the workspace.
     - `users:read.email`: View email addresses of users.
     - `channels:manage`: Manage public channels, including creating new ones.

4. **Install the App**:
   - If prompted, reinstall the app to apply the new permissions.

## Additional Resources

- [Slack API Documentation](https://api.slack.com/)
- [Managing OAuth Scopes](https://api.slack.com/authentication/oauth-v2)
- [Creating and Configuring Slack Apps](https://api.slack.com/start)

By following these steps, your Slack app will be set up to create and manage channels, view users, and access their email addresses within the specified workspace. This configuration is essential for any app that aims to automate or facilitate channel management in Slack.

---
