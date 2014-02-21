'use strict';

angular.module('piathome.directives', []).

directive('draggable', function() {
    return function(scope, element) {        
        var el = element[0];
        el.draggable = true;
        el.addEventListener(
            'dragstart',
            function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );
        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    }
}).

directive('droppable', function() {
    return {
        scope: {
            drop: '&'            
        },
        link: function(scope, element) {
            var el = element[0];
            
            el.addEventListener(
                'dragover',
                function(e) {
                    e.dataTransfer.dropEffect = 'move';
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                },
                false
            );
            
            //el.addEventListener(
            //    'dragenter',
            //    function(e) {
            //        this.classList.add('over');
            //        return false;
            //    },
            //    false
            //);
            //
            //el.addEventListener(
            //    'dragleave',
            //    function(e) {                    
            //        this.classList.remove('over');
            //        return false;
            //    },
            //    false
            //);
            
            el.addEventListener(
                'drop',
                function(e) {                    
                    var listHolderId = this.id,
                        item= document.getElementById(e.dataTransfer.getData('Text'));
                    
                    if(e.target.parentNode.nodeName.toLowerCase() == 'ul') {
                        e.target.parentNode.insertBefore(item, e.target.nextSibling);                        
                    } else if(e.target.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'ul') {
                        var ulele= e.target.parentNode.parentNode.parentNode;
                        ulele.insertBefore(item, e.target.parentNode.parentNode.nextSibling)
                    } else {                        
                        console.log('cannot drop item here');
                    }
                    
                    scope.$apply(function(scope) {
                        var fn = scope.drop();
                        if ('undefined' !== typeof fn) {
                            fn(item.id, listHolderId);
                        }
                    });
                },
                false
            );
            
        }
    }
}).

directive('showonhoverparent', function() {
    return {
        link : function(scope, element, attrs) {
            element.parent().bind('mouseenter', function() {
                element.show();
            });
            element.parent().bind('mouseleave', function() {
                element.hide();
            });
        }
    };
}).

directive('butterbar', ['$rootScope', function($rootScope) {
    return {
        link: function(scope, element, attrs) {

            element.addClass('hide');

            $rootScope.$on('$routeChangeStart', function() {
                element.removeClass('hide');
            });

            $rootScope.$on('$routeChangeSuccess', function() {
                element.addClass('hide');
            }); }
    }
}]).

directive('focus', function() {
    return {
        link: function(scope, element, attrs) {
            element[0].focus();
        }
    }
}).

directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}).
directive('nodeimsFileUpload', ['fileUploader','piUrls', function(fileUploader, piUrls) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            maxFiles: '@',
            maxFileSizeMb: '@',
            getAdditionalData: '&',
            onstart: '&',
            onprogress: '&',
            ondone: '&',
            onerror: '&'
        },
        template: function(tElem,tAttrs){
            var templates={
                small: '<div>'+
                    '<button class="btn btn-default upload_file_container">'+
                        '<input type="file" style="opacity: 0;width:50px">'+
                    '</button><span ng-transclude></span>'+
                    '<label ng-if="progressText"  style="width:50px;height:50px;">'+
                        '<small class="text-success">{{progressText}}</small>'+
                    '</label>'+
                   '</div>',
                large: '<div>'+
                    '<button class="btn btn-info upload_file_containerlarge btn-block">'+
                        '<input type="file" style="opacity: 0;width:100%;height:100%;z-index: 100">'+
                            '<span class="glyphicon glyphicon-plus-sign"></span><span ng-transclude></span>'+
                    '</button>'+                   
                    //'<label ng-if="progressText">'+
                    //    '<small class="text-success">{{progressText}}</small>'+
                    //'</label>'+
                   '</div>',
            };
            return (tAttrs.type == 'small')? templates.small : templates.large;
        },
        compile: function compile(tElement, tAttrs, transclude) {                         
            if (!tAttrs.maxFiles) {
                tAttrs.maxFiles = 1;
                tElement.removeAttr("multiple")
            } else {
                tElement.attr("multiple", "multiple");
            }        
            if (!tAttrs.maxFileSizeMb) {
                tAttrs.maxFileSizeMb = 50;
            }        
            return function postLink(scope, el, attrs, ctl) {
                scope.files = [];
                scope.showUploadButton = false;
                scope.percent = 0;
                scope.progressText = "";        
                el.bind('change', function(e) {
                    console.log('file change event');
                    if (!e.target.files.length) return;
                    
                    scope.files = [];
                    var tooBig = [];
                    if (e.target.files.length > scope.maxFiles) {
                        raiseError(e.target.files, 'TOO_MANY_FILES', "Cannot upload " + e.target.files.length + " files, maxium allowed is " + scope.maxFiles);
                        return;
                    }
        
                    for (var i = 0; i < scope.maxFiles; i++) {
                        if (i >= e.target.files.length) break;        
                        var file = e.target.files[i];
                        scope.files.push(file);        
                        if (file.size > scope.maxFileSizeMb * 1048576) {
                            tooBig.push(file);
                        }
                    }
        
                    if (tooBig.length > 0) {
                        raiseError(tooBig, 'MAX_SIZE_EXCEEDED', "Files are larger than the specified max (" + scope.maxFileSizeMb + "MB)");
                        scope.$apply(function() {
                            scope.onerror({files: scope.files, type:  'MAX_SIZE_EXCEEDED',
                                        msg: "File size is larger than the specified maximum (" + scope.maxFileSizeMb + "MB)"});
                        })
                        return;
                    }
                    scope.autoUpload = 'true'; //forcing as of now
                    if (scope.autoUpload && scope.autoUpload.toLowerCase() == 'true') {
                        scope.upload();
                    } else {
                        scope.$apply(function() {
                            scope.showUploadButton = true;
                        })
                    }
                });
        
                scope.upload = function() {
                    scope.onstart();
        
                    var data = null;
                    if (scope.getAdditionalData) {
                        data = scope.getAdditionalData();
                    }        
                    fileUploader
                        .post(scope.files, data)
                        .to(piUrls.fileUpload)
                        .then(function(ret) {
                            scope.ondone({files: ret.files, data: ret.data});
                        }, function(error) {
                            scope.onerror({files: scope.files, type: 'UPLOAD_ERROR', msg: error});
                        },  function(progress) {
                            scope.onprogress({percentDone: progress});
                            scope.percent = progress;
                            scope.progressText = progress + "%";
                            //scope.ondone({files: 'test', data: 'test'});
                        });
        
                    resetFileInput();
                };
        
                function raiseError(files, type, msg) {
                    scope.onerror({files: files, type: type, msg: msg});
                    resetFileInput();
                }
        
                function resetFileInput() {
        
                }
            }
        }
    }
}]);


