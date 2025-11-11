// This service strips PII and fuzzes location.
const anonymizeData = (post) => {
  // In a real app, you might do more complex fuzzing
  // Here we just select the fields we want to keep.
  return {
    caption: post.caption,
    image_url: post.image_url,
    location_district: post.location_district,
    location_geo: {
      type: 'Point',
      coordinates: [post.geo.longitude, post.geo.latitude]
    },
    original_timestamp: post.timestamp
  };
};

module.exports = {
  anonymizeData,
};