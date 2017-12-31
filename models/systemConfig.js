var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * systemConfig Model
 * ==========
 */
var systemConfig = new keystone.List('systemConfig', {
    label: '系统参数',
    plural: '系统参数',
    nocreate: true
});

systemConfig.add(
    '微信开发平台信息', {
    wechatOpen: {
        ticket:                 { type: Types.Textarea,     noedit: true },
        access_token:           { type: Types.Textarea,     noedit: true },
        expires_in:             { type: Types.Datetime,     noedit: true },
        auto_reply:             { type: Types.Text,         require: true },
    }
});


/**
 * Registration
 */
systemConfig.defaultColumns = 'wechatOpen.auto_reply, wechatOpen.ticket, wechatOpen.access_token, wechatOpen.expires_in';
systemConfig.register();

