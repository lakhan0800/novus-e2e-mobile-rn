import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationLibraryType, PendoSDK, WithPendoReactNavigation } from "rn-pendo-sdk";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ProjectScreen } from "./src/screens/ProjectScreen";

export type RootStackParamList = {
  Home: undefined;
  Project: { projectId: string; name: string };
};

PendoSDK.setup("8f390970-4b52-49f9-84da-10ac9598b622", {
  library: NavigationLibraryType.ReactNavigation,
});
// The app has no sign-in yet, so no visitor or account ID is available and this session is
// anonymous. Once auth exists, call startSession on sign-in with the user's and account's IDs.
PendoSDK.startSession();

const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PendoNavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Taskly" }} />
        <Stack.Screen
          name="Project"
          component={ProjectScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </PendoNavigationContainer>
  );
}
