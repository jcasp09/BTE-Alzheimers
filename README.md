# BTE-Alzheimers

### Setup

- Download and sign-in to 'Expo Go' IOS app
- Run `npm start`
- Scan QR-code in terminal to be taken to app preview

### Repo notes

- `app/_layout.tsx` is the root, and defines a 'stack screen' that references the `app/(tabs)` directory. In `app/(tabs)/_layout.tsx` we create 'Tabs.Screen's whose name attribute auto-route to corresponding files in the `(tabs)` directory.

- The 'theme'/'color-scheme' files in the `components`, `constants`, and `hooks` directories are boilerplate, and modifiable templates for light and dark modes. It seems confusing but the only thing to rly worry about is how to use the provided theme components when displaying things. In the future we can mess around with our own color/styling templates.
