# AMERICANA DIGEST - VPS Deployment Guide (Bash Method)

This guide provides simple, step-by-step instructions to pull and host Americana Digest on your VPS server (`185.241.208.230`).

---

## 1. Connect to your VPS via SSH

Open your local terminal (PowerShell, Command Prompt, or Git Bash) and run:

```bash
ssh root@185.241.208.230
```
Enter your password when prompted:
```text
GI80vO2O2Pk6
```

---

## 2. One-Command Initial Setup & Launch

Run the following command on your VPS:

```bash
curl -fsSL https://raw.githubusercontent.com/wahvyboy/AMERICANA-digest/main/scripts/server-setup.sh | bash
```

### What this script automatically does:
1. Installs **Git, Nginx, Node.js 20 LTS, and Certbot**.
2. Clones the project to `/var/www/americanadigest.blog`.
3. Runs `npm install` and builds the production bundle with Vite.
4. Generates an optimized Nginx server block for `americanadigest.blog` and `www.americanadigest.blog` with Gzip compression and asset caching.
5. Issues a free **Let's Encrypt SSL certificate** for HTTPS.

---

## 3. How to Update Your Website in the Future

Whenever you make changes on your local computer and push them to GitHub (`git push origin main`), update your live VPS with these two simple commands:

```bash
cd /var/www/americanadigest.blog
./deploy.sh
```

---

## 4. Verification & Testing

Once installed:
- Visit: [https://americanadigest.blog](https://americanadigest.blog)
- Check robots.txt: [https://americanadigest.blog/robots.txt](https://americanadigest.blog/robots.txt)
- Check XML Sitemap: [https://americanadigest.blog/sitemap.xml](https://americanadigest.blog/sitemap.xml)
- Email check: support inquiries and newsletter requests go to **support@americanadigest.blog**.
