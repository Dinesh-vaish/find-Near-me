import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/search/SearchBar'
import BusinessList from '../components/business/BusinessList'
import MapView from '../components/map/MapView'

const Home = () => {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    radius: 500
  })

  useEffect(() => {
    getUserLocation()
  }, [])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          setUserLocation(location)
          searchNearby(location, filters)
        },
        (error) => {
          console.error('Location error:', error)
        }
      )
    }
  }

  const searchNearby = async (location = userLocation, searchFilters = filters) => {
    if (!location) return

    setLoading(true)
    try {
      const params = {
        latitude: location.latitude,
        longitude: location.longitude,
        radius: searchFilters.radius
      }
      
      if (searchFilters.category) {
        params.category = searchFilters.category
      }

      const response = await axios.get('/api/search/nearby', { params })
      setBusinesses(response.data.data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (newFilters) => {
    setFilters(newFilters)
    searchNearby(userLocation, newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Local Businesses Near You
          </h1>
          <p className="text-xl text-blue-100">
            Find the best coaching centers, shops, and services in your area
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MapView businesses={businesses} userLocation={userLocation} />
            <BusinessList businesses={businesses} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
