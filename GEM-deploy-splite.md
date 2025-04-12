<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Help us understand these errors.

Based on the build log provided[^1], the Vercel deployment process failed during the installation phase. Here's a breakdown of the errors and warnings:

1. **Main Build Failure:**
    * The command `cd ../.. &amp;&amp; pnpm install --no-frozen-lockfile` exited with code 1[^1]. This indicates that the package installation process failed, which halted the entire build.
2. **Root Cause - `better-sqlite3` Installation Failure:**
    * The failure occurred specifically during the installation of the `better-sqlite3` package, which requires native C++ addons[^1].
    * **Attempt 1 (Prebuilt Binary):** The system first tried to use a prebuilt binary. This failed with a warning: `/lib64/libm.so.6: version 'GLIBC_2.29' not found (required by /vercel/path0/node_modules/better-sqlite3/build/Release/better_sqlite3.node)`. This means the prebuilt version of `better-sqlite3` was compiled against a newer version of the standard C library (GLIBC 2.29) than what is available in the Vercel build environment[^1].
    * **Attempt 2 (Compile from Source):** Because the prebuilt binary failed, the system fell back to compiling `better-sqlite3` from source using `node-gyp`. This compilation process also failed due to a C++ compiler error: `g++: error: unrecognized command line option ‘-std=c++20’; did you mean ‘-std=c++03’?`[^1]. This indicates that the C++ compiler (`g++`) available in the Vercel build environment is too old and does not support the C++20 standard (`-std=c++20`) required by the `better-sqlite3` source code.
    * The C++ compilation error caused `make` to fail, which in turn caused `node-gyp` to report a build error, ultimately leading to the failure of the `pnpm install` command[^1].
3. **Deprecation Warnings:**
    * The log shows warnings for deprecated packages: `eslint@8.57.1` and 12 subdependencies (like `glob`, `lodash.get`, `react-beautiful-dnd`, `rimraf`)[^1]. These are *warnings*, not errors. They indicate that you are using older package versions that are no longer actively maintained or recommended. While they didn't cause the build failure, it's advisable to update these dependencies eventually to avoid potential bugs or security issues[^2].

In summary, the build failed because the Vercel build environment was incompatible with the `better-sqlite3` package. Neither the prebuilt binary (due to GLIBC version mismatch) nor compiling from source (due to an outdated C++ compiler) worked. The primary issue to resolve is the C++ compiler incompatibility in the build environment.

<div>⁂</div>

[^1]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/6754629/ee0a8453-a76b-49fb-9daf-49bf68f9add5/paste.txt

[^2]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/org_9ab1d7a2-5c5a-470c-beac-ca0f23bf1fde/72153f9d-b882-4198-944c-47becb0342ef/DR-UB-Ecosystem-Monorepo_-Potential-Pitfalls-and-Impr.md

[^3]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/org_9ab1d7a2-5c5a-470c-beac-ca0f23bf1fde/e98aaad2-cbee-4898-a291-611263bcab3d/PPLX-on-db-creation.md

[^4]: https://docs.google.com/document/d/1S3NtdVpNQQsdUpfF8DmBxqIZIP1Wh2vq5UcrP_FSViA/edit?usp=drivesdk

[^5]: https://drive.google.com/file/d/13ORWEy4DH_lHzvDUZMGrtox2Buy9nh1g/view?usp=drivesdk

[^6]: https://drive.google.com/file/d/1VUs_ZnYiDHn34IlC2_sd-pDLaRPfsc-J/view?usp=drivesdk

[^7]: https://drive.google.com/file/d/1zFxXM2i2lzXxSmUAiEHlIzQtg2m2o0Ef/view?usp=drivesdk

[^8]: https://drive.google.com/file/d/1o1U1qMnZRRQn83JeBWXQeDIKDXB4j-ck/view?usp=drivesdk

[^9]: https://drive.google.com/file/d/12MS-TBefKMAKcwIpH0rm-DJuRDd20qjq/view?usp=drivesdk

[^10]: https://docs.google.com/document/d/15FnnLL2vEJUG6VPst2c1rJi6oUD_N4B1fJeS1K6NilY/edit?usp=drivesdk

[^11]: https://drive.google.com/file/d/1t4Z6ljpyPOpE4opQ-y_jp0pIieFceMNm/view?usp=drivesdk

[^12]: https://drive.google.com/file/d/1p18HD98uBAasGq82xyUjmq7MSUaHVxY6/view?usp=drivesdk

[^13]: https://drive.google.com/file/d/1sMP2tiPZfsf2YVpThUGC8apDzNyiE1AL/view?usp=drivesdk

[^14]: https://docs.google.com/document/d/1iHDO2xlnIw9043Vg2YfcvjMt4qVFgsWI4IxgvsM1xuQ/edit?usp=drivesdk

