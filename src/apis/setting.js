export default {
    settings: (vendor_id) => window.axios.get('settings?' + 'vendor_id=' + vendor_id + '&is_langauge=en')
}