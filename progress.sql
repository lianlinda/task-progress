/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : task

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2017-01-19 17:12:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for progress
-- ----------------------------
DROP TABLE IF EXISTS `progress`;
CREATE TABLE `progress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) NOT NULL COMMENT '任务名',
  `type` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '任务类型',
  `taskDetail` varchar(255) NOT NULL COMMENT '任务详情（简要说明）',
  `bugDetail` varchar(255) DEFAULT NULL COMMENT 'bug详情（简要说明）',
  `startTime` datetime NOT NULL COMMENT '开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '结束时间',
  `expectTime` float NOT NULL COMMENT '预计完成所需时间(以天为单位)',
  `actualTime` float DEFAULT NULL COMMENT '实际完成所需时间(以天为单位)',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of progress
-- ----------------------------
INSERT INTO `progress` VALUES ('1', 'todoList', '0', 'todoList demo 练习', null, '2016-12-21 16:49:28', '2016-12-26 10:49:33', '5', '4.5', '已上传到github中');
INSERT INTO `progress` VALUES ('2', '换页面banner', '0', 'fengdai_app换页面banner 小需求', null, '2016-12-30 17:15:10', '2017-01-30 16:39:15', '0.042', '0.083', '主要花在git操作上');
INSERT INTO `progress` VALUES ('3', '设备管理', '0', 'fengdai_admin添加设备管理页面', null, '2017-01-06 09:00:00', '2017-01-10 10:00:27', '2', '2', 'bootstrap基础薄弱，git冲突');
INSERT INTO `progress` VALUES ('4', '免息活动', '0', 'fengdai_pc添加免息活动静态页面', null, '2017-01-16 12:30:45', '2017-01-17 17:03:04', '1', '1.5', '1.less css薄弱 2.border-radius ie8兼容问题：用.htc文件处理');
