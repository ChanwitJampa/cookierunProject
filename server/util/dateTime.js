const  timestampToBangkokDate=(timestamp)=>{
    const date = new Date(timestamp);
    // Bangkok time zone offset: UTC+7
    const options = { 
        timeZone: 'Asia/Bangkok', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
        // hour: '2-digit', 
        // minute: '2-digit', 
        // second: '2-digit' 
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    return formatter.format(date);
}

export {
    timestampToBangkokDate
}