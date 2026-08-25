import { createAsyncStorage } from '@react-native-async-storage/async-storage/jest'

const DATA_BASE_NAME = 'db'

export const storage = createAsyncStorage(DATA_BASE_NAME)
