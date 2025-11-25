import { useRef, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { BackHandler, StyleSheet, View, Text, Platform, Linking } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";

SplashScreen.preventAutoHideAsync();

const getHost = (url) => {
	const host = new URL(url).host;
	return host.replace("www.", "");
};

/**
 * Recommended to put the website url to dashboard.
 * When you are not logged in, it will redirect to login page automatically.
 */
const WEBSITE_URL = "PUT_YOUR_WEBSITE_URL_HERE";

const BASE_WEBSITE_URL = getHost(WEBSITE_URL);

export default function App() {
	const webViewRef = useRef(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;
		const timer = setTimeout(async () => {
			await SplashScreen.hideAsync();
		}, 200);

		return () => clearTimeout(timer);
	}, [isLoading]);

	useEffect(() => {
		if (Platform.OS === "ios") return;

		const handleBack = () => {
			if (!webViewRef.current) return false;
			webViewRef.current.goBack();
			return true;
		};

		const handleEvent = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBack,
		);
		return () => handleEvent.remove();
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
				<StatusBar style="auto" hidden={false} />
				<View style={styles.content}>
					<WebView
						ref={webViewRef}
						style={styles.web}
						incognito={true}
						mixedContentMode="never"
						startInLoadingState={true}
						setSupportMultipleWindows={false}
						renderLoading={() => <Text>Loading...</Text>}
						source={{ uri: WEBSITE_URL }}
						allowsBackForwardNavigationGestures
						onShouldStartLoadWithRequest={({ url, navigationType }) => {
							if (navigationType === 'other' || url.includes(BASE_WEBSITE_URL)) return true;
							WebBrowser.openBrowserAsync(url);
							return false;
						}}
						pullToRefreshEnabled={true}
						mediaPlaybackRequiresUserAction={false}
						onLoadEnd={() => setIsLoading(false)}
						onFileDownload={({ nativeEvent: { downloadUrl } }) => {
							if (downloadUrl) Linking.openURL(downloadUrl);
						}}
					/>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
	},
	web: {
		flex: 1,
	},
	loader: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	loaderOverlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255,255,255,0.6)",
	},
});
