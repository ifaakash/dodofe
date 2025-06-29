const decorationData = [
    {
        bgColor: '#EBF6F2',
        width: 20,
        height: 20,
        top: '20%',
        left: '60%'
    },
    {
        bgColor: '#FCF3D9',
        width: 20,
        height: 20,
        top: '75%',
        left: '60%'
    },
    {
        bgColor: '#FEEBFE',
        width: 25,
        height: 25,
        top: '65%',
        left: '30%'
    }
]

const BlobChart = ({ contentAnalytics }: { contentAnalytics: any }) => {
    const radius = 80; // Distance from center

    console.log('contentAnalytics', contentAnalytics)

    // Extract and sort the content data values
    const contentValues = {
        posts: contentAnalytics?.posts || 0,
        stories: contentAnalytics?.stories || 0,
        reels: contentAnalytics?.reels || 0
    };

    // Sort values to determine which data goes in which pre-defined position
    const sortedEntries = Object.entries(contentValues).sort(([,a], [,b]) => b - a);
    
    // Pre-defined circle configurations
    const circleConfigs = [
        {
            angle: 240,
            color: '#F25A99',
            bgColor: '#FEECEB',
            width: 120,
            height: 120,
            top: '65%',
            left: '50%'
        },
        {
            angle: 0,
            color: '#F25A99',
            bgColor: '#FDECF3',
            width: 72,
            height: 72,
            top: '53%',
            left: '43%'
        },
        {
            angle: 120,
            color: '#458CFF',
            bgColor: '#EBF2FF',
            width: 48,
            height: 48,
            top: '40%',
            left: '63%'
        }
    ];

    // Map sorted data to pre-defined configurations
    const chartData = sortedEntries.map(([type, value], index) => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: Number(((value / (contentValues.posts + contentValues.stories + contentValues.reels)) * 100).toFixed(2)) || 0,
        ...circleConfigs[index]
    }));

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-[300px] h-[200px]">
                {chartData.map((item, index) => {
                    const angleInRadians = (item.angle * Math.PI) / 180;
                    const x = radius * Math.cos(angleInRadians);
                    const y = radius * Math.sin(angleInRadians);

                    return (
                        <div
                            key={index}
                            className="absolute flex items-center justify-center rounded-full"
                            style={{
                                width: item.width,
                                height: item.height,
                                backgroundColor: item.bgColor,
                                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                                top: item.top,
                                left: item.left
                            }}
                        >
                            <div className="flex flex-col items-center justify-center " style={{ color: item.color }}>
                                <div className="leading-none font-semibold text-xs">{item.value}%</div>
                                <div className="leading-none text-[8px]">{item.name}</div>

                            </div>
                        </div>
                    );
                })}
                {decorationData.map((item, index) => {
                    return (
                        <div key={index} className="absolute flex items-center justify-center rounded-full" style={{ width: item.width, height: item.height, backgroundColor: item.bgColor, top: item.top, left: item.left }}></div>
                    )
                })}
            </div>
        </div>
    )
}

export default BlobChart