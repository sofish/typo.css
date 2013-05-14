module.exports = function(grunt) {
  //配置参数
  grunt.initConfig({
     cssmin: {
         options: {
             keepSpecialComments: 0
         },
         compress: {
             files: {
                 'typo.min.css': ['typo.css']
             }
         }
     }
  });
 
  //载入cssmin 插件，分别对于合并和压缩
  grunt.loadNpmTasks('grunt-contrib-cssmin');
 
  //注册任务
  grunt.registerTask('default', ['cssmin']);
}
