# Release Notes for piSignage Server

This document covers releases for both server lines:

- **3.x.x** — legacy server
- **5.x.x** — modern rewrite (server2)

Most recent releases ship to both lines simultaneously and use a dual version notation (e.g. *"3.9.6/5.0.5 Server Release"*).

For player-side notes, see:
- [RELEASE NOTES - Player 5.x.x.md](<RELEASE NOTES - Player 5.x.x.md>) — Player2 (4.x.x and 5.x.x)
- [RELEASE NOTES - Player 3.x.x.md](<RELEASE NOTES - Player 3.x.x.md>) — Original Player (3.x.x and earlier)

---

#### 5.2.1   Server Release
1. Getting-started reminder: accounts that haven't registered a player within a week of signing up receive a friendly reminder email with a one-click link to their players page and step-by-step setup guidance
2. Collaborator permissions: a collaborator granting rights now gets the rights they are allowed to assign applied, instead of the whole request being rejected when it includes something beyond their own permissions
3. Playlist deploy fix: playlists using standard layouts no longer send an unnecessary template file to players
4. Renaming an account now updates its login-page image links automatically
5. Account settings now include purchased-license details for linked accounts

#### 5.2.0   Server Release
1. USB export of group assets
    - Export a group's deployed content (media, playlists, layouts) as a zip archive for offline loading onto players
    - Works on both filesystem and S3 storage accounts, with reliable progress reporting, automatic cleanup of old archives, and clean recovery from interrupted exports
2. Self-hosted release distribution
    - Self-hosted/white-label customers now download server releases directly from pisignage.com, authenticated with their white-label license — no more shared-drive links
    - Optional email notification to license holders when a new release is published
    - Example setup kit and deployment scripts included for new self-hosted installations
3. SAML/SSO improvements
    - Login failures now redirect to a proper error page instead of a blank response
    - More reliable user matching across identity providers (Entra ID, Okta, and others)
    - Restored compatibility with IdPs that sign only the SAML response (e.g. ADFS/Shibboleth) — the assertion-signing requirement introduced in 5.1.4 is relaxed; either a signed response or a signed assertion is accepted
    - SAML settings can now be viewed and updated from the UI
    - Accounts auto-created on first SSO login now land on the v2 UI when signing in from it
4. Forgot-password and change-password flows moved to the v2 UI
5. Reports fix: accounts with a large number of players (~120+) no longer hit a "Request-URI Too Large" error when generating reports
6. Billing accuracy: license usage counts stay correct at the license limit, and accounts at exactly zero balance are no longer blocked from deploying or configuring players
7. Reliability fixes from production: occasional worker crashes under concurrent downloads, statistics/reports aggregation errors, player check-in errors on multi-domain setups, playlist preview (custom layouts, portrait mode), plain HTML assets in layouts, contact-form ticket attribution, archived-account notices, and playlist deletion now correctly removing the playlist from associated assets
8. Clearer session-expiry messages, reduced log verbosity, early rejection of common vulnerability-scanner probes, and hardened login endpoints against malformed requests
9. v2 UI updated to build 1.0.8

#### 5.1.4   Server Release
1. Security-hardening release
    - Payment integrity: webhook signature verification and server-side order verification across Stripe, Razorpay, and PayPal
    - Stricter file-path validation and cross-account access checks on asset and player endpoints
    - SSO, signup, and collaborator-permission hardening
    - Abuse protection for the public RSS proxy
2. Collaborator rights templates
    - Save and reuse named permission presets when adding collaborators (up to 3 per account)

#### 5.1.3   Server Release
1. Access control: per-account ownership is now enforced consistently on all object endpoints (groups, labels, locations, players and player commands, appstore); admin and reseller cross-account access is preserved
2. Scheduled deploys now include notice images and custom-layout background images, matching manual deploys
3. Custom layout uploads automatically receive the player library, so playlist zones render inside the layout without manual editing
4. AppStore data is now included when an installation migrates between domains/servers
5. New public health endpoint (`/api/healthstatus`) for load-balancer and liveness checks
6. Improved multi-core worker scaling for larger servers

#### 5.1.2   Server Release
1. AppStore
    - Collaborator read/write permissions for AppStore access
    - Admin and reseller visibility across their client installations
2. Payments: PayPal capture made robust against non-standard buyer profile data, so a successful payment always 
      results in credits/licenses
3. SAML login on multi-domain deployments now redirects the user to the correct server automatically
4. New `defaultToV2` partner flag to land all visitors on the v2 UI without per-user opt-in
5. Stability: cluster process-communication hardening and a fix for first-time OTP login

#### 3.10.0/5.1.1   Server Release
1. AppStore
    - Unified backing store for v2 UI grid-builder layouts and reusable custom HTML widgets, listable together or filtered by type
    - Export app pages as HTML assets that drop straight into playlists; appstore and assets-list cards share the same thumbnail
2. Power BI — error visibility on integration failures
    - Every PBI HTTP failure path now logs the Microsoft response body (token fetch, refresh, embed) instead of swallowing it
    - On-screen error page renders a short stage + errorCode diagnostic (e.g. `GenerateToken · PowerBINotAuthorizedException`); existing tailored 403/404 copy unchanged
3. SAML — template-based collaborator provisioning
    - Parent accounts can stash a SAML config (`entryPoint`/`issuer`/`cert`) and invite collaborators onto it without the parent itself being on SAML; template fields validated together so partial saves can't be persisted
4. Collaborator invitations no longer rewrite the target user's `role` or `parentAccount` — the prior `strictCollaborators` side-effect that mutated an unrelated account's identity is removed; the invite itself is unaffected
5. Default landing flipped to v2 UI 
    - Anonymous visitors now land on `/v2/<path>` 
    - For logged-in traffic, beta opt-in changed from "user OR installation" to "user AND installation" — tenants that opted in on only one side must set the other to stay on v2; existing fully-opted-in tenants are unaffected
    - Partners can suppress v2 entirely via `partnerConfig.disableBetaUi`
   6. Android player 5.4.6 - Support Over the Air Updates(OTA) for devices that do not have access to Play Store
   
#### 3.9.9/5.1.0/5.0.9  Server Release
1. Power BI dual-mode integration
    - new **delegated-user** "Sign in with Microsoft" OAuth mode (user-owns-data, ~$10/mo licensing)   
       alongside the existing **service-principal** mode (app-owns-data, ~$750/mo+); shared multi-tenant Entra app for the OAuth flow
    - Optional **Row-Level Security** (username/roles)
    - Silent in-place token refresh in the player template a few minutes before expiry, with the 60-minute full-page reload kept only as a safety net
    - Secrets at rest: new AES-256-GCM `crypto-vault` for SP secret and OAuth tokens
    - Page selection: an admin can pin a report to a single page or rotate through a chosen subset of pages, instead of splitting a report into separate sub-reports
2. Android OTA update endpoint for the sideloaded APK channel 
3. Location update scoped to installation: `updateLocation` previously ran across all installations 
4. Schedule end date: default the hour to 24 (end of day) when no hour is present, instead of treating it as 0
5. Self-hosted server bundles with beta UI and preview support
6. Beta UI fixes mainly related to self-hosted, collaborators, anonymous logins

#### 3.9.8/5.0.8   Server Release
1. Player status change tracking
    - New `statusChangeTime` field on each player records when its state last meaningfully changed (connect/disconnect, CEC TV on/off, playlist on/off)
2. Beta UI (v2) for self-hosted and white-label
    - Beta UI redirect now works on non-piSignage partner deployments
    - Login/signup on host-mapped third-party domains correctly redirect to `/v2/` when the user has opted in
    - Fix: anonymous visitors on a host-mapped domain were landing on the marketing homepage instead of the app
3. v2ui frontend
    - Next.js and React major-version upgrade
    - Login/signup redirect fix, playlist-in-other-zones rendering fix, guard checks for missing settings

#### 3.9.7/5.0.7   Server Release
1. Reseller account management: 
    - server-enforced allocation of licenses, server credits, storage to child clients with adjustments against the reseller
    - clients are now created with zero initial licenses/storage/credits
    - Ability to hide subscription tab for the client
    - Reseller access from child account can be removed if needed
2. Collaborator deletion
   - when a parent removes a pure collaborator (not another user) the underlying user record (and associated data) is deleted 
3. Group/player listing fix
   - collaborator listings no longer fall back to "all groups" when the filter array contains no group entries
4. Playlist rename fix
   - writing the renamed playlist JSON now targets the original filename so renames don't leave orphaned files
5. Self-hosted Server 
   - Redirect unauthenticated requests to the configured home page
   - Beta UI integration for self-hosted instrallations
6. 4K video support: 
   - when `enable4kSupport` is on, transcoding is skipped for all formats (not just mp4/mkv); 
   - `enable4kSupport` is now propagated from the parent installation to collaborator sessions
7.  PWA 5.4.3 release: new offline fallback page, centered welcome screen layout, settings button fix
8.  Preview 5.4.3: matching offline page,aspect ratio preserve
   
#### 3.9.6/5.0.5 Server Release
1. SAML IdP-initiated SSO: extract Issuer from SAMLResponse when RelayState is missing, add idpCert for newer passport-saml
2. Delayed delete improvements: free up email and player cpuSerialNumber on soft-delete, hide deleted users from collaborator lists
3. Preview app: in-browser preview of playlists based on new PWA
4. Location-based access control for collaborators: assign specific locations to collaborators with view-only option
5. Turkish language support (tr_TR locale)
6. Lazy-load playlist thumbnails with infinite scroll for unassigned playlist items
7. Defer payment scripts (Razorpay/Stripe/PayPal) to subscriptions page instead of loading globally
8. Android/PWA Player2 updates: 
   - settings page fixes
   - missing webpage options
   - PWA release
   - settings button fix
   - YouTube/video autoplay fixes 
   - Welcome notice change
   - New PDF.js package
   - resolution watch removal
   - Fixed - Android disconnect issue occuring every 3 minutes
9. WebSocket connection stability fix (reverted aggressive timeout increase)
10. Player2 installation procedure documentation updates
11. Server2 specific
    - Exclude player images from bundle to reduce size
    - OpenAPI documentation: YAML specs for all major APIs (auth, assets, playlists, groups, players, locations, reports, settings, subscriptions, template designer)
    - autoIndex enabled for self-hosted deployments based on systemd service detection 
    - FFmpeg error fix in file processing
    - Webpack config updates for hosted server build
    - Ansible deployment improvements: SSL/Certbot playbook, git and acl package installation
    - Fix workers crashing due to null keyValue in locations controller

#### 3.9.5/5.0.3 Server Release    
     
1. SAML login improvements: Fixed issues with few of the providers    
   - identifier-based login for returning users  
   - issuer-based org lookups  
2. Video transcoding enhancements: H.264 level/bitrate checks, rounded FPS for Pi compatibility, improved FFmpeg parameters
3. 4K video support: optional per-user setting to skip transcoding for 4K mp4/mkv files
3. Login branding: custom logo, colors, and auth images per user on login/signup pages
4. Plus-addressing email validation (RFC 5233) for availability checks during signup
5. Soft-delete for user accounts with 7-day TTL before permanent removal
6. Strict collaborator enforcement: restrict collaborators to same email domain 
7. Self-remove as collaborator: users can remove themselves from accounts they collaborate on
8. Credit notes support in invoices: fetch and display Zoho credit notes alongside invoices
10. Google login and signup: email/username availability checks during OAuth signup flow
11. PowerBI report page navigation and scroll support with zod validation
12. PayPal API integration updates
13. Categories management: refactored rename/delete with installation filter support
14. Introducing Location rights for collaborators
14. PWA updates for player2
15. New website routing and homepage restructuring
16. Prev/next navigation implementation for New-UI
17. Player URL path normalization: fix double slashes in player URLs
18. Logout handling fixes: cookie clearing and crash prevention
19. 404 page added for unmatched routes

#### 3.9.4 Server Release

1. Add collaborator rights for collaborators, which can be used for adding/editing other collaborators. 
2. Email change in profile settings requires OTP verification during next login. 
3. Multiple rows of TV on/off support in the location tab. 
4. Change playlist name when the playlist file name is changed. 
5. Favicon change 
6. Fix for getting the playlist emoji and description (getPlaylist)
7. Changing the default group color for the new UI.

#### 3.9.0-3.9.3 Server Releases
1. Support for recent mongodb versions by replacing mongoose callback with promise 
2. Migration to ES6 and later node version support
3. Support for multiple region support and migration support for new server code implementation
4. Japanese Language addition
5. Ongoing feature additions/improvements and bug fixes

#### 3.8.0   Server Release
1. Fix for repeated downloads and deletes in group players when some of the players have additional groups or playlists

#### 3.7.1   Server Release
1. Avoid location verification and disable GMail support for white label customers
2. Add validity field for asset download list

#### 3.7.0   Server Release
1. Added support for SAML based SSO signup and login
2. Power BI reports support added - use PowerBI type asset link under add assets button
3. Fixed issues of empty login error message and other minor issues

#### 3.6.0   Server Release
1. Features added needed for upcoming New-UI and Interactive features

#### 3.5.0   Server Release
1. Security features added - **Please make sure you are able to access the email ID registered with your account, 
   otherwise write to support to update your email ID**

#### 3.4.1   Server
1. Added upload/download statistics 
2. Added number of players under Groups tab, total duration of playlist under playlists screen
3. Fixed issue with multiple playlist assignments under assets screen
4. Feature to add duration and modify option for multiple assets under playlists screen
5. Show players selected in Reports screen for reports
6. Added new feature to manage locations for players (for e.g. TV OFF/ON based on location)
7. UI improvements to show more info - player notes, creation date etc.

#### 3.4.0   Server 
1. Added Two Factor authentication with email OTP or Google Authenticator support
2. Rememeber me option while login
3. Ability to change email, username or password under profile settings page
4. Help while renewing subscription - minimum needed for next month and value for next 1 year
5. Ability to add invoice details during purchase
6. Avoid playlist corruption 

#### 3.3.1   Server 
1. Fix server crashes when playlist is corrupted
2. Package UI to speed up loading of server UI
3. Create billing entry for player disable/enable
4. Avoid playlist corruption while drag and drop 
5. Convert RazorPay to INR from USD

#### 3.3.0  Server Only
1. Use mangodb aggregator for report generation instead of deprecated mapReduce

#### 3.2.7   Server 
1.Avoid unnecessary downloads to player on player poweron
1. Including .htm extension for html files

#### 3.2.2 server-only release
1. Automatically adding duration and thumbnail for the YouTube links
2. Log of user activity available for last 7 days - see under settings tab, show log activity
3. Account getting locked after adding emergency playlist - fixed
4. Auto invoice generation for online payment

#### 3.2.1 server-only release
1. Asset or playlist renaming - update Groups and Playlists as needed
2. Asset or playlist deletion - update Groups and Playlists as needed
3. Group deletion - allow only when there are no players attached, update otherGroups assocaited with players
4. Group rename - update Player groups and otherGroups as needed
5. Update playlists during get operation for deleted and validity expiration of assets
6. Allow validity provisioning during upload of assets
7. Added emergency playlist and emergency message feature to deploy to all players across installation under Groups
8. Add validity to multiple assets at once
9. invert display option in player2 orientation

#### 3.2.0a server-only release
1. Dual display support UI under Group settings for player2 4.7.0 release onwards
2. Fixed issue of playlist search and categories bar missing
3. Increased limit of schedulable playlists to 150 (from 100)

---

*Note: Older server changes that were published jointly with player releases (e.g. "3.2.6 Server + Player release", "3.2.0", etc.) are kept alongside the player notes in [RELEASE NOTES - Player 3.x.x.md](<RELEASE NOTES - Player 3.x.x.md>).*
