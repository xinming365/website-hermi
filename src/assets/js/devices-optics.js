const DevicesOptics = {
    template: `
    <div>  test........ </div>
        <div v-if="device">
            <h1>{{ device.name }}</h1>
            <p>{{ device.description }}</p>
            <ul>
                <li v-for="feature in device.features" :key="feature">{{ feature }}</li>
            </ul>
            <p>价格: {{ device.price }}</p>
        </div>
        <div v-else>加载中...</div>
    `,
    data() {
        return {
            device: null
        }
    },
    created() {
        this.fetchDeviceData(this.$route.params.id);
    },
    methods: {
        fetchDeviceData(id) {
            fetch('/devices/devices-data.json')
                .then(response => response.json())
                .then(data => {
                    this.device = data.find(d => d.id === id);
                })
                .catch(error => console.error('错误:', error));
        }
    }
};

// export default DevicesOptics;

export default {
    name: 'DevicesOptics',
    created() {
        console.log('DevicesOptics 组件已创建');
    },
    mounted() {
        console.log('DevicesOptics 组件已挂载');
    },
    // ... 组件的其他部分 ...
};