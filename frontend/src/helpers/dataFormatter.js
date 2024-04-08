import dayjs from 'dayjs';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            name: item.name,
            publicUrl: item.publicUrl || ''
        }))
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },

        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.firstName)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },

        contactsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        contactsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        contactsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        contactsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        teamsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        teamsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        teamsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        teamsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        jobsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        jobsOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        jobsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        jobsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        tradesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        tradesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        tradesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        tradesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        templatesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        templatesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        templatesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        templatesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

}
