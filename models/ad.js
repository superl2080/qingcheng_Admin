var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ad Model
 * ==========
 */
var ad = new keystone.List('ad', {
    label: '广告',
    plural: '广告',
    defaultSort: '-createDate'
});

ad.add({
    createDate:             { type: Types.Datetime,     default: Date.now, noedit: true, label: '创建日期'},

    aderId:                 { type: Types.Relationship, initial: true, ref: 'ader', label: '所属广告主' },
    type:                   { type: Types.Select,       initial: true, options: [{ value: 'WECHAT_MP_AUTH', label: '微信公众号授权' }, { value: 'WECHAT_MP_API', label: '微信公众号api接入' }], label: '广告类型'},
    state:                  { type: Types.Select,       default: 'CREATE', required: true, options: [{ value: 'CREATE', label: '创建中' }, { value: 'OPEN', label: '等待投放' }, { value: 'DEFAULT', label: '青橙官方' }, { value: 'DELIVER', label: '投放中' }, { value: 'CANCEL', label: '取消授权' }], label: '状态'},

    }, '投放信息', {
    deliverInfo: {
        payout:             { type: Types.Number,       default: 50, label: '扫码领取广告主计费(分)'},
        priority:           { type: Types.Number,       default: 10, label: '优先度(大值优先)'},
        count:              { type: Types.Number,       default: 0, label: '计划吸粉数'},
        partnerType:        { type: Types.Select,       default: 'ALL', required: true, options: [{ value: 'ALL', label: '全部' }, { value: 'WHITE', label: '白名单' }, { value: 'BLACK', label: '黑名单' }], label: '投放合伙人'},
        partnerIds:         { type: Types.Relationship, ref: 'partner', many: true, label: '合伙人列表' },
        userType:           { type: Types.Select,       default: 'ALL', required: true, options: [{ value: 'ALL', label: '全部' }, { value: 'WHITE', label: '白名单' }, { value: 'BLACK', label: '黑名单' }], label: '投放用户'},
        userTags:           { type: Types.TextArray,    label: '用户标签列表' },
    },

    }, '微信公众号授权-参数', {
    wechatMpAuthInfo: {
        pre_auth_code:      { type: Types.Textarea,     noedit: true },
        appid:              { type: Types.Textarea,     noedit: true },
        user_name:          { type: Types.Text,         noedit: true },
        qrcode_url:         { type: Types.Textarea,     noedit: true },
        access_token:       { type: Types.Textarea,     noedit: true },
        expires_in:         { type: Types.Datetime,     noedit: true },
        refresh_token:      { type: Types.Textarea,     noedit: true },
        head_img:           { type: Types.Textarea,     noedit: true },
        nick_name:          { type: Types.Text,         noedit: true },
        service_type:       { type: Types.Number,       noedit: true },
        verify_type:        { type: Types.Number,       noedit: true },
     },

    }, '微信公众号api接入-参数', {
    wechatMpApiInfo: {
        channelId:        { type: Types.Relationship, ref: 'configAdChannel', label: '广告渠道' },
    }
});


ad.schema.virtual('name').get(function () {
    if( this.wechatMpAuthInfo ) {
        return this.wechatMpAuthInfo.nick_name;
    } else {
        return this.wechatMpApiInfo.channel;
    }
});


/**
 * Registration
 */
ad.defaultColumns = 'aderId, type, name, wechatMpAuthInfo.nick_name, count, payout, income, state, createDate';
ad.register();
