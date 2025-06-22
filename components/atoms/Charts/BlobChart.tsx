const chartData = [
    {
        name: 'Reels',
        value: 50,
        top: 10,
        left: 40,
        color: '#F25A99',
        bgColor: '#FDECF3'
    },
    {
        name: 'Posts',
        value: 30,
        top: 80,
        left: 140,
        color: '#458CFF',
        bgColor: '#EBF2FF'
    },
    {
        name: 'Stories',
        value: 20,
        top: 150,
        left: 40,
        color: '#F25A99',
        bgColor: '#FEECEB'
    }
]

const BlobChart = () => {

    return (
        <div className="min-w-[200px] h-[280px] relative flex items-center justify-center">
            {
                chartData.map((item, index) => (
                    <div key={index} className={`absolute flex items-center justify-center w-[120px] h-[120px] rounded-full`} style={{ top: item.top, left: item.left, backgroundColor: item.bgColor }}>
                        <div className="flex flex-col items-center justify-center text-[10px]" style={{ color: item.color }}>
                            <div className="leading-none font-semibold"> {item.name} </div>
                            <div className="leading-none font-medium"> {item.value} </div>
                        </div>
                            
                            
                    </div>
                ))
            }
        </div>
    )
}

export default BlobChart