import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';

const BASE_URL = "https://hp-api.onrender.com/api/"
class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			characters: []
		}
	}

	getCharacters(){
		axios.get(`${BASE_URL}characters`)
		.then((response) => {
			this.setState({ 
				characters: response.data && response.data || []
			})
		})
		.catch((error) => {
			console.log("error", error)
		})
	}

	componentDidMount(){
		this.getCharacters()
	}

	render() {
		return (
			<View style={styles.container}>
				
				<FlatList
					style={styles.list}
					data={this.state.characters}
					renderItem={({item, index}) => {
						return (
							<View key={index} style={styles.row}>
								
								<Image source={{url: item.image}} style={styles.image}  />
				
								<View style={[styles.column, { marginLeft: 10}]}>
									<Text style={[styles.text, { fontWeight: "bold"}]}>{item.name}</Text>
									<Text style={styles.text}>{item.species}</Text>
									<Text style={styles.text}>{item.gender}</Text>
								</View>
							</View>
							
						)
					}}
				/>
			</View>
		);

	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15
	},
	list: {
		flex: 1, 
		width: "100%", 
		padding: 10,
		marginTop: 10
	},
	image: {
		width: 80, 
		height: 100
	},
	row:{ 
		flex: 1,
		flexDirection: "row",
		margin: 10
	},
	column: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start"
	},
	text: {
		fontSize: 18
	}
})

export default App;