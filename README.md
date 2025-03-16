# usepref - React User Preferences

usepref is a React library that allows you to manage, update, and store user preferences and settings.

**Note:** The only part of the library that is not React-specific is provider and hook, which is just a thin wrapper
around the storage provider. If anyone wants to split this library into a core and react-specific library, that would
be awesome, otherwise I'm sure I'll end up doing it if I need it in a non-react project.

## Features

- [x] Store & Sync User Preferences
- [x] [React Context Provider](#preferencesprovider)
- [x] [React Hook](#usepreferences)
- [ ] Sync across multiple storage interfaces
- [ ] Asynchronous storage interfaces
- [ ] [IPC](https://www.electronjs.org/docs/latest/tutorial/ipc)

**Storage Interfaces**

- [x] [Local Storage](#localstorage)
- [x] [Memory Storage](#memorystorage)
- [ ] IndexedDB
- [ ] Async Storage
- [ ] [IPC](https://www.electronjs.org/docs/latest/tutorial/ipc)

## Getting Started

### Installation

```sh
npm install usepref
```

### Usage

This library comes with multiple storage interfaces that implement
the [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage). You can use any of these or create your
own.

#### PreferenceStorage

[PreferenceStorage](#preferencestorage) is the parent class that manages the user preferences and mutating the storage.
To start,
simply create a new instance of [PreferenceStorage](#preferencestorage).

```ts
import {PreferenceStorage} from 'usepref';

const storage = new PreferenceStorage({key: 'my-key'});
```

If no `storage` prop is provided, a default storage interface will be used. The default storage interface used
depends on
the environment. If the `window` object is defined, the default storage interface will
be [localStorage](#localstorage). Otherwise, it will
be [MemoryStorage](#memorystorage).

You can provide your own storage interface by passing it to the [PreferenceStorage](#preferencestorage) constructor as
follows:

```ts
import { PreferenceStorage } from 'usepref';
import { MemoryStorage } from 'usepref/storage/memory';

const storage = new PreferenceStorage({
  key: 'my-key',
  storage: new MemoryStorage(),
});
```

#### PreferencesProvider

The [PreferencesProvider](#preferencesprovider) is a React context provider that provides
the [PreferenceStorage](#preferencestorage) instance to its children.

```tsx
import { PreferencesProvider } from 'usepref';

function App() {
  return (
    <PreferencesProvider>
      <MyApp/>
    </PreferencesProvider>
  );
}
```

#### usePreferences

The [usePreferences](#usepreferences) hook a getter and setter for the [PreferenceStorage](#preferencestorage) instance.

**Note:** You can also use `usePref()` instead of `usePreferences()`, it's simply a shorter alias.

```tsx
import { usePreferences } from 'usepref';

function MyComponent() {
  const { getItem } = usePreferences();

  return <div>{getItem('my-key')}</div>;
}
```

```tsx
import { usePreferences } from 'usepref';

function MyComponent() {
  const { getItem, setItem } = usePreferences();

  return <Switch checked={getItem('my-key')} onChecked={(value) => setItem('my-key', value)} />;
}
```


### Storage Interfaces

#### LocalStorage

The LocalStorage interface uses the Web
API's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

#### MemoryStorage

The MemoryStorage interface uses an in-memory object to store the user preferences.
See [storage/memory.ts](storage/memory.ts).

## Contributing

### New Storage Interfaces

New storage interfaces can be added by creating a new class that implements
the [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage).
See [storage/memory.ts](storage/memory.ts) for an example. If you want to add a new storage interface, go for it!
