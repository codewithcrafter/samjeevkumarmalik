---
title: "WordPress Security Hardening: A Practical Checklist for Business Websites — Sanjeev Kumar Malik"
description: "Hardening wp-config, XML-RPC disabling, database prefix obfuscation, REST API authentication, and edge firewall rule sets that stop automated brute force attacks."
url: "https://sanjeevkumarmalik.in/blogs/wordpress-security-hardening-checklist"
category: "WordPress Engineering"
reading_time: "8 min read"
publish_date: "July 2026"
author: "Sanjeev Kumar Malik"
role: "Principal Full-Stack Web Development Architect"
phone: "+91 97186 04362"
email: "info@sanjeevkumarmalik.in"
---

# WordPress Security Hardening: A Practical Checklist for Business Websites

## 1. The Automated Threat Landscape

              
                Almost no WordPress hacking is conducted by human adversaries manually typing passwords. Instead, distributed automated botnets run 24/7 port scans against known WordPress endpoints: `/xmlrpc.php`, `/wp-login.php`, and `/wp-json/wp/v2/users`.
              

              
                If your site runs on default configurations with the username `admin` and an unshielded login route, your server CPU is needlessly wasted answering thousands of malicious automated POST requests every day.
              

              
                
                  🛡️
                  The Golden Security Principle
                
                
                  Security is not a single plugin you install; it is layers of defense (Defense in Depth). Block attacks at the DNS edge before malicious packets ever hit your Origin server or spawn PHP worker processes.
                
              

              

## 2. Server & wp-config Security Directives

              
                Your `wp-config.php` file is the crown jewel of your WordPress installation. Adding four crucial constants closes the most prevalent attack vectors:
              

              
                /* Essential Security Directives in wp-config.php */

                // 1. Disable the live file editor inside the WP Admin dashboard

                define('DISALLOW_FILE_EDIT', true);

                // 2. Prevent unauthenticated automatic plugin/theme installations

                define('DISALLOW_FILE_MODS', true);

                // 3. Force SSL encrypted communication across all admin sessions

                define('FORCE_SSL_ADMIN', true);

                // 4. Limit post revisions to prevent database table bloat

                define('WP_POST_REVISIONS', 5);
              

              

## 3. Disabling XML-RPC & User Enumeration

              
                The `xmlrpc.php` file is a legacy protocol originally built for mobile app synchronization. Today, it is almost exclusively exploited for amplified brute-force attacks (multicall methods trying 500 password combinations in a single HTTP request).
              

              
                Disable it completely at the web server layer (Nginx or Apache `.htaccess`):
              

              
                # Nginx Server Directive

                location = /xmlrpc.php {

                  deny all;

                  access_log off;

                  log_not_found off;

                }
              
              
                Additionally, disable author enumeration endpoints (`/?author=1`) so attackers cannot harvest usernames to fuel credential stuffing lists.
              

              

## 4. Database Prefix Hardening & File Permissions

              
                Never keep the default database table prefix `wp_`. Changing it during deployment to something randomized like `skm7x_` immunizes your database against automated SQL injection scripts hardcoded for default table names.
              

              
                Enforce strict Linux file permissions:
              

              
                - Directories: `755` (read/execute for others, write only for owner).

                - Files: `644` (read for others, write only for owner).

                - `wp-config.php`: `600` or `400` (read-only for server user).

              

              

## 5. Cloudflare Edge Firewall Rules

              
                Route all domain traffic through Cloudflare’s free or Pro proxy. Implement a Web Application Firewall (WAF) rule challenging any request to `/wp-login.php` with a Managed Turnstile Challenge for users outside your target geography.
              

              

## 6. Disaster Recovery & Immutable Backup Strategy

              
                The ultimate security insurance is an offsite, immutable backup. Store encrypted daily database dumps on AWS S3 or Backblaze B2 with 30-day object versioning. If an unknown zero-day ever compromises the server, you can rebuild a pristine instance in under 15 minutes.
              

            

            
            
              🟢 Direct Founder Discovery
              

### 
                Harden Your Business Website Today
              

              
                Concerned about vulnerability audits, server hardening, or Cloudflare WAF configuration? Consult directly with Sanjeev Kumar Malik.
              

              
                Book Founder Session →
                Browse More Essays
              
            

            
            
              
                ← Previous Essay
                Custom WordPress Plugins vs Off-the-Shelf Plugins
              
              
                Next Essay →
                Headless WordPress: When It Makes Sense and When It Doesn't

---

## Author & Architecture Inquiries

**Sanjeev Kumar Malik** is a senior web architect with 15+ years of hands-on production experience and over 1,700 delivered websites. He works directly with founders and technical leaders across Delhi NCR and globally.

- **Phone / WhatsApp:** [+91 97186 04362](tel:+919718604362)
- **Email:** [info@sanjeevkumarmalik.in](mailto:info@sanjeevkumarmalik.in)
- **Article Link:** [https://sanjeevkumarmalik.in/blogs/wordpress-security-hardening-checklist](https://sanjeevkumarmalik.in/blogs/wordpress-security-hardening-checklist)
