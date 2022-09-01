import React, { useContext } from "react";
import { StyleSheet, Share, Text, View, TouchableOpacity } from 'react-native'
import themeContext from '../config/themeContext';
import { Ionicons } from "@expo/vector-icons";

const BottomPart = (prop) => {

	// Load theme
    const theme = useContext(themeContext);

	// When share button is pressed
    const onShare = async (text) => {
		try {
			const result = await Share.share({
				message: text,
		});
		if (result.action === Share.sharedAction) {
			if (result.activityType) {
				// Action will be the activity type
			} 
			
			else {
			}
			} else if (result.action === Share.dismissedAction) {
				// Action is dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

    return (
    <View style={styles.bottomCard}>
		<View style={styles.share}>
			{/* Share button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onShare("Have you visted the amazing Sushi place " + prop.name + " yet?" )
                }}
                >
                <Ionicons name="share-social" size={28} color="red"/>	
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
	  bottomCard: {
		flex: 1, 
		flexDirection: "row",
		alignItems: "stretch"
	  },
	  share: {
		marginTop: 15,
		width: "50%",
		flex: 1,
	    alignItems: "flex-start",
	    justifyContent: 'center',
	  },
	  shareButton: {
		  marginLeft: 20,
	  }
  });

export default BottomPart;