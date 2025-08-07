1. npm create vite@latest
        - React + Typescript

2. npm install tailwindcss @tailwindcss/vite
        - Installing tailwind css and import @import "tailwindcss"; in index.css

3. added below changes in tsconfig.json file
        -   "compilerOptions": {
              "baseUrl": ".",
              "paths": {
                "@/*": ["./src/*"]
              }
            }

4. added below changes in tsconfig.app.json file
        -  "baseUrl": ".",
              "paths": {
                "@/*": [
                  "./src/*"
                ]
              }

5. npm install -D @types/node and added below changes in vite.config.ts file
        -  plugins: [react(), tailwindcss()],
            resolve: {
              alias: {
                "@": path.resolve(__dirname, "./src"),
              },
            },

6. npx shadcn@latest init with neutral color

7. npx shadcn@latest add button

