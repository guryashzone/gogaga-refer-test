// Submit form
document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault()
	message.innerText = 'Saving data..'
	const options = {
		url: '/users',
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		},
		data: {
			name: userName.value,
			location: userLocation.value
		}
	}

	axios(options).then(response => {
		console.log(response)
		
		if (response.status === 201) {
			userName.value = userLocation.value = ''
			message.innerText = 'Data Saved'
			fetchData()
		} else {
			message.innerText = 'ERROR: ' + response.statusText
		}

	})
})

// Render Data
const fetchData = () => {
	message.innerText = 'Searching..'
	result.innerHTML = ''

	let query = ''

	if (search.value !== '') {
		query = '?search=' + search.value
	}

	axios.get('/users'+query).then(response => {
		console.log(response)
		message.innerText = `Fetched ${response.data.length} rows.`
		
		if (response.status !== 200) {

			return message.innerText = 'ERROR: ' + response.statusText
		}
		
		response.data.forEach((user, i) => {
			let row = `
				<tr>
					<td>${i+1}</td>
					<td>${user.name}</td>
					<td>${user.location}</td>
				</tr>
			`
			result.innerHTML += row
		})

	})	
}

// Search
document.querySelector('#search').addEventListener('input', fetchData)

window.onload = fetchData