# dev notes / specifications (WIP)

0. Setup/Notes
1. Motivation & Core Vision
2. Core Functionality
3. Demographic
4. Additional Features
5. Tech Stack
6. Data Model
7. System-level Design Goals

---

### Setup

Run

```
cd frontend
npm start
```

#### Platform preview options are available in terminal (iOS, Android, Web)

e.g. Mobile:

- Have 'Expo Go' app installed and signed in to
- QR-code in terminal takes you to app preview

### Notes

Expo/React:

- `app/_layout.tsx` is the root, and defines a 'stack screen' that references the `app/(tabs)` directory. In `app/(tabs)/_layout.tsx` we create 'Tabs.Screen's whose name attribute auto-route to corresponding files in the `(tabs)` directory.

- The 'theme'/'color-scheme' files in the `components`, `constants`, and `hooks` directories are boilerplate, and modifiable templates for light and dark modes. It seems confusing but the only thing to rly worry about is how to use the provided theme components when displaying things. In the future we can mess around with our own color/styling templates.

Mobile dev/Firebase:

- You regenerate native application folders like `ios/` with `npx expo prebuild` (e.g. changing the bundle ID or adding a native module). `ios/` for example includes Xcode workspace files that you open with Xcode (Apple's iOS IDE).
- Our TypeScript/React Native code can't run by itself on an iPhone, it needs a native iOS app that loads and runs it. `ios/` is an Xcode project that builds the `.app` that iOS devices can actually run; It includes the React Native runtime, the JavaScript engine, a small native shell, etc.
- So, you write in TypeScript (and other non-Swift languages) outside Apple’s ecosystem, but on device your app is still “an iOS app written in Swift (and C++) that hosts a JS runtime and your bundle.”  The `ios/` folder is that host. Same idea on Android with the android/ folder and Kotlin/Java.

- Firebase is connected to the different platforms independently. When connecting an iOS app to firebase, you input your app's _bundle ID_ which identifies individual apps within Apple's ecosystem. This is easily identifiable in something like Xcode as it's an iOS IDE. In other IDEs like VSCode, its available in app.json.
- Firebase provides you with a GoogleService-Info.plist file to download and place in the `ios/frontend` directory. You then need to add it to the Xcode workspaces _project_, and _targets_
- You can use different apps/platforms in Firebase. Each has its own config:
  - iOS: `GoogleService-Info.plist` (per app / bundle ID)
  - Android: `google-services.json` (per app / package name)
  - Web: the more familiar `firebaseConfig` object  (per app)

---

### 1. Motivation & Core Vision

This application provides preventative and early-stage cognitive support through a visual, relational memory graph that helps users preserve identity, maintain routines, and strengthen associations between people, places, tasks, and memories.

Rather than isolated brain-training games, the app links cognition directly to real-world context, reinforcing:

- Personal identity
- Social relationships
- Daily routines
- Time and task awareness

This supports users in retaining a sense of who they are through meaningful connections.

#### Key goals:

- Preventative cognitive reinforcement
- Identity preservation
- Image + place + person association
- Real-world contextual memory anchoring

> “To help with her memory we had pictures with labels of who was in the picture so that she could have a reference for faces.”

---

### 2. Core Functionality: Visual Relationship Graph

At the heart of the application is an interactive visual graph that represents meaningful entities and their relationships.

### Node Types (Examples):

- People (family, doctors, caregivers)
- Places (home, work, doctor’s office)
- Tasks / Events
- Memories / Moments

### Edge Types:

- Family relationship
- Frequently visited
- Responsible for
- Related to
- Emotional closeness
- Task relevance

### Adjustable Graph UI

The graph is **highly customizable**:

- Node size and visibility control
- Adjustable number of displayed nodes
- Zoomable and pannable layout
- Ability to:
  - Add nodes
  - Add relationships
  - Upload images per node
  - Link nodes together

### UI Enhancements:

- Gentle 2D physics (nodes slowly float for an inviting feel)
- Dynamic node scaling based on importance / urgency
- Optimized for tablets and larger displays, but usable on phones
- Accessibility features:
  - Large date/time display
  - Emergency call buttons
  - Simplified layouts for cognitive load reduction

---

### 3. Dual Demographic Design

The application supports two primary user modes, enabled through UI + graph tuning:

### A. Preventative Mode

- Functions as a visual journal + relationship builder
- Emphasizes:
  - Memory creation
  - Rich linking
  - Reflection
  - Exploration

### B. Early-Onset Cognitive Support Mode

- Functions as a visual memory aid
- Emphasizes:
  - Only the most critical nodes
  - Faces, names, frequent places
  - Daily routines
  - Simplified UI

This dual design allows the platform to adapt to cognitive progression instead of being limited to a single clinical use case.

---

### 4. Advanced Feature Concepts

### A. Task / Calendar Integration (Time-Oriented Cognitive Support)

- Integrates external calendar APIs
- Automatically creates task/event nodes
- Tasks dynamically link to:
  - Person nodes
  - Place nodes
  - Medication nodes

Example:
A doctor’s appointment → creates a task node → links to:

- Doctor (person)
- Doctor’s office (place)

Graph-driven scheduling visualization:

- Node size ∝ time until event
- Display limits:
  - Maximum upcoming tasks
  - Maximum linked context nodes
- Tunable complexity for different cognitive needs

This targets common decline areas:

- Time orientation
- Task recall
- Planning
- Sequencing

---

### B. Memory / Moment Nodes (Past-Oriented Cognitive Support)

Memory nodes act as visual snapshots of the past, serving as:

- Emotional anchors
- Identity reinforcers
- Relationship reminders

Each memory node contains:

- One or more images
- Description text
- Links to any relevant people, places, or tasks

Two design options:

1. Separate Visual Journal View
2. Unified Graph Node Type
   These nodes connect past, present, and future, reinforcing continuity of identity.

---

### 5. Tech Stack & Architecture

### Frontend

- React Native
- React Flow (graph visualization)
- Tailwind CSS (optional for rapid styling)
- Optimized for tablets, phones, laptops

### Backend (Firebase – BaaS)

#### Firebase Authentication

- Handles user authentication
- Stores identity & access control

#### Firestore (NoSQL Database)

- Stores:
  - User profiles
  - Graph structure
  - Nodes
  - Edges
  - Preferences
  - Reminders

#### Firebase Cloud Storage

- Stores:
  - Node images
  - Memory photos
- Firestore only stores image URLs

#### Note:

Import the shared app instance where you need it:

`import { app } from '@/lib/firebase';`

Then use Firebase services, e.g.:

```
import { getFirestore } from 'firebase/firestore';
const db = getFirestore(app);
```

---

### 6. High-Level Data Model (WIP)

```swift
users/{userId}/
 ├── profile/
 │    ├── name
 │    ├── email
 │    ├── themePreference
 │    ├── emergencyContacts
 │
 ├── graph/
 │    ├── nodes/{nodeId}/
 │    │     ├── type (person | place | task | memory)
 │    │     ├── label
 │    │     ├── imageURLj
 │    │     ├── priority
 │    │     ├── metadata (timestamps, tags, etc.)
 │    │
 │    ├── edges/{edgeId}/
 │          ├── sourceNodeId
 │          ├── targetNodeId
 │          ├── relationshipType
 │          ├── weight / importance
 │
 ├── reminders/
 │    ├── {reminderId}
```

---

### 7. System-Level Design Goals

- Highly modular → scalable feature growth
- Adaptive complexity → supports multiple cognitive stages
- Graph-first mental model → intuitive memory reinforcement
- Firebase-native → real-time sync, auth, storage, and scaling
