module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            created: `${year}/${month}/${day}`
        }
    },
    erro() {
        let error = ''
        if (req.session.error) {
            return error = req.session.error
        }
    }
}