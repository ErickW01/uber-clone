// import * as SecureStore from 'expo-secure-store'

// const tokenCache = {
//     async getToken(key: string) {
//         try {
//             const item = await SecureStore.getItemAsync(key);
//             if(item)
//                 console.log('retrieve key');
//             else
//                 console.log('No key retrieved')
//             return item;
//         } catch(error) {
//             console.error('SecureStore error: ', error);
//             await SecureStore.deleteItemAsync(key);
//             return null
//         }
//     }
// }