// components/item/item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        color: {
            type: String,
            default: 'yellow'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isPreview: false,
        previewPos: {
            top: 0,
            bottom: 0,
            height: 200
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onContentClick() {
            let that = this;
            if (this.data.isPreview) {
                this.setData({
                    isPreview: false,
                    previewPos: {
                        top: 0,
                        height: 200
                    }
                })
            } else {
                this.getContentRect(function(rect) {
                    let systemInfo = wx.getSystemInfoSync();
                    console.log('top: ' + rect.top)
                    that.setData({
                        previewPos: {
                            top: rect.top * systemInfo.pixelRatio,
                            height: 200
                        }
                    }, function() {
                        that.setData({
                            isPreview: true,
                            previewPos: {
                                top: 0,
                                height: systemInfo.windowHeight * systemInfo.pixelRatio
                            }
                        })
                    });
                })
            }
        },
        getContentRect(callback) {
            let querySelector = wx.createSelectorQuery();
            let thumb = querySelector.in(this).select('.content');
            thumb.boundingClientRect(callback).exec();
        }
    }
})