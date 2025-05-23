import { View, Text } from 'react-native'
import React from 'react'
import { SignedIn, useUser, SignedOut } from '@clerk/clerk-expo'
import { SignOutButton } from '@clerk/clerk-react';
import { Link } from 'expo-router';

const home = () => {

  const {user} = useUser();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton/>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}

export default home