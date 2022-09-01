import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import themeContext from '../../config/themeContext';
import { EventRegister } from 'react-native-event-listeners';

const ReviewsScreen = ({ navigation }) => {

  // Load the theme
	const theme = useContext(themeContext);

  // Review ratings
  const [ratings, setRatings] = useState({});

	function onStarRatingPress(id, rating) {
        setRatings({ ...ratings, [id] : rating })
        // Update reviews on screen
        EventRegister.emit("updateReviews", {
            review: {
                id: id,
                rating: rating,
            } 
        });
	}

	let STORAGE_KEY = '@reviews';

  // Save the reviews in AsyncStorage
	const saveReviews = async () => {
		try {
		  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
		} catch (e) {
		  console.log('Error: ' + e)
		}
	  }

    // Get the reviews from AsyncStorage
	  const readReviews = async () => {
      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value !== null) {
        setRatings(JSON.parse(value));
        }
      } catch (e) {
        console.log('Error: ' + e)
      }
	  };

    // Update the reviews of the screen
    useEffect(() => {
      let eventListener = EventRegister.addEventListener("updateReviewsPage",(data) => {
          setRatings({ ...ratings, [data.review.id] : data.review.rating })
      });
      return () => {
        EventRegister.removeEventListener(eventListener);
      }
    })

	  useEffect(() => {
		readReviews();
	  }, []);

	  useEffect(() => {
		saveReviews();
	  }, [ratings]);

	return (
		<View style={[ styles.container, {backgroundColor: theme.background }]}>
        {/* Display all the reviews */}
				{Object.entries(ratings).map(([key, val]) => 
            <View key={key} style={[ styles.card, { borderColor: theme.borderColor, backgroundColor: theme.listBackground }]}>
                <Text style={{color: theme.color, fontWeight: 'bold'}}>{key}</Text>
                <View style={styles.rating}>
                  <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={ratings.hasOwnProperty(key) ? ratings[key] : 0}
                      selectedStar={(rating) => onStarRatingPress(key, rating)}
                      fullStarColor={'#FDCC0D'}
                      starSize={25}
                  />
			          </View>
            </View>
          )}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
    card: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 15,
        width: '80%',
        marginTop: 15 
    },
    rating: {
        width: '95%',
        marginTop: 15,
        marginBottom: 15
    },
});

export default ReviewsScreen;
