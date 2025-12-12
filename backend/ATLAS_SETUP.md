# MongoDB Atlas Setup Guide

Follow these steps to set up a free MongoDB database and get your connection string.

## 1. Create an Account and Cluster
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  **Sign up** or **Log in**.
3.  Click **+ Create** or **Build a Database**.
4.  Select **M0 Free** (shared tier).
5.  Choose a provider (AWS) and region close to you.
6.  Click **Create**.

## 2. Create a Database User
1.  In the **Security** Quickstart (or under **Database Access** on the left sidebar):
2.  Click **+ Add New Database User**.
3.  Enter a **Username** (e.g., `admin`).
4.  Enter a **Password**. **IMPORTANT**: Write this down! You will need it for the URI.
5.  Select **Read and write to any database** (or specific privileges).
6.  Click **Add User**.

## 3. Whitelist Your IP Address
1.  Go to **Network Access** on the left sidebar.
2.  Click **+ Add IP Address**.
3.  Click **Allow Access from Anywhere** (0.0.0.0/0) for easiest development access, OR **Add Current IP Address** for better security.
4.  Click **Confirm**.

## 4. Get the Connection String
1.  Go back to **Database** (on the left).
2.  Click **Connect** on your cluster card.
3.  Select **Drivers**.
4.  Under **"Add your connection string into your application code"**, you will see a string like:
    ```
    mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    ```
5.  **Copy** this string.

## 5. Configure Your Application
1.  Open the `backend/.env` file in this project.
2.  Find `MONGO_URI`.
3.  Paste the string you copied.
4.  Replace `<username>` with your database username (if not already filled).
5.  Replace `<password>` with the password you created in Step 2.
    *   *Note: Remove the `<` and `>` brackets.*
6.  (Optional) You can replace `/?retryWrites` with `/job-application-tracker?retryWrites` to specify the database name depending on the string format.

## Example
If your user is `giree`, password is `secure123`, and cluster is `cluster0.abcde`, your URI might look like:
`mongodb+srv://giree:secure123@cluster0.abcde.mongodb.net/job-application-tracker?retryWrites=true&w=majority`
