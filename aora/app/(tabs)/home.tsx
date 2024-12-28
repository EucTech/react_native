import { FlatList, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
      data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text>{item.id}</Text>
      )}  
      ListHeaderComponent={() => (
        <View className="my-6 px-4 space-y-6" >
          <View className="justify-between items-center flex-row mb-6">
            <Text>
              Welcome back
            </Text>
            <Text>JSMastery</Text>
          </View>
        </View>
      )}
      />

    </SafeAreaView>
  )
}

export default Home