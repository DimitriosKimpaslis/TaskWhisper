import AsyncStorage from "@react-native-async-storage/async-storage";

export async function handleCategoryCreation(newCategory) {
    const categories = await AsyncStorage.getItem('categories');
    let categoriesArray = JSON.parse(categories);
    if(!newCategory) return;

    
    if (categoriesArray.includes(newCategory)) {
    }else{
        categoriesArray.push(newCategory); 
    }
    await AsyncStorage.setItem('categories', JSON.stringify(categoriesArray));
}