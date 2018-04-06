//Copyright 2018 Aditya Yogesh Patel
//Licensed under MIT Opensource License
//https://opensource.org/licenses/MIT
function getVideoPayload(source, embedTag) {
  if (!embedTag) {
    payload = '<div class="modal-body puyModalBody videoModalBody">' +
      '<h3>For video, define an embedTag with the location of video or embed tag of external sources</h3>';
  }
  if (!source) {
    console.log("Source Not Defined for Video. Source will be considered local");
    source = 'local';
  }
  if (source == 'local') {
    payload = '<div class="modal-body puyModalBody">' +
      '<video width="100%" height="auto" autoplay controls>' +
      '<source src="' + embedTag + '" type="video/mp4">' +
      '</video>';
  }
  if (source == 'youtube') {
    payload = '<div class="modal-body puyModalBody videoModalBody">' +
      '<iframe width="auto" height="300" src="https://www.youtube.com/embed/' + embedTag + '?autoplay=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
  }
  if (source == 'vimeo') {
    payload = '<div class="modal-body puyModalBody videoModalBody">' +
      '<iframe width="auto" height="300" src="https://player.vimeo.com/video/' + embedTag + '?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
  }
  return payload;
}

function getIframeParams(iframeWidth, iframeHeight) {
  params = 'width="' + iframeWidth + '"';
  params += iframeHeight ? (' height="' + iframeHeight + '"') : '';
  return params;
}

function removeDisplayedModal() {
  if ($('#puyModal').length > 0) {
    $('#puyModal').remove();
    if (('.modal-backdrop').length > 0) {
      $('.modal-backdrop').remove();
    }
  }
}

function makeSize(inputString) {
  if (inputString.indexOf('%') >= 0) return inputString;
  else if (inputString.indexOf('px') >= 0) return inputString;
  else return inputString + 'px';
}

function getNumbers(inputString) {
  if (inputString.indexOf('%') >= 0 || inputString.indexOf('px') >= 0) {
    inputString = inputString.replace(/%/g, '');
    inputString = inputString.replace(/px/g, '');
    return inputString;
  } else return inputString;
}

function puyModal(options) {
  removeDisplayedModal();
  var that = {};
  that.hasStyles = false;
  that.type = 'general';
  if (typeof(options.type) != 'undefined') {
    that.type = options.type;
  }

  that.title = '';
  if (typeof(options.title) != 'undefined') {
    that.title = options.title;
  }

  that.heading = false;
  if (typeof(options.heading) != 'undefined') {
    that.heading = options.heading;
  }
  that.message = '';
  if (typeof(options.message) != 'undefined') {
    that.message = options.message;
  }
  that.loadPage = false;
  if (typeof(options.loadPage) != 'undefined') {
    that.loadPage = options.loadPage;
  }

  that.iframe = false;
  if (typeof(options.iframe) != 'undefined') {
    that.iframe = options.iframe;
  }

  that.iframeWidth = '100%';
  if (typeof(options.iframeWidth) != 'undefined') {
    that.iframeWidth = options.iframeWidth;
  }

  that.iframeHeight = false;
  if (typeof(options.iframeHeight) != 'undefined') {
    that.iframeHeight = options.iframeHeight;
  }
  //Sizing Params
  that.width = false;
  if (typeof(options.width) != 'undefined') {
    that.hasStyles = true;
    that.width = makeSize(options.width);
  }
  that.maxWidth = false;
  if (typeof(options.maxWidth) != 'undefined') {
    that.hasStyles = true;
    that.maxWidth = makeSize(options.maxWidth);
  }
  that.height = false;
  if (typeof(options.height) != 'undefined') {
    that.hasStyles = true;
    that.height = makeSize(options.height);
  }
  that.maxHeight = false;
  if (typeof(options.maxHeight) != 'undefined') {
    that.hasStyles = true;
    that.maxHeight = makeSize(options.maxHeight);
  }
  that.overflowY = 'auto';
  if (typeof(options.overflowY) != 'undefined') {
    that.hasStyles = true;
    that.overflowY = options.overflowY;
  }


  //Video Parameters
  that.videoSource = false;
  if (typeof(options.videoSource) != 'undefined') {
    that.videoSource = options.videoSource;
    that.hasStyles = true;
  }
  that.embedTag = false;
  if (typeof(options.embedTag) != 'undefined') {
    that.embedTag = options.embedTag;
  }

  that.videoPayload = false;
  if (that.type == 'video') {
    that.videoPayload = getVideoPayload(that.videoSource, that.embedTag);
  }



  //Style tag definitions
  that.style = '';
  if (that.hasStyles) {
    that.style = '<style>';

    that.style += '.modal-dialog {';
    if (that.width) {
      that.style += 'width: ' + that.width + ';';
    }
    if (that.maxWidth) {
      that.style += 'max-width: ' + that.maxWidth + ';';
    }
    if (that.height) {
      that.style += 'height: ' + that.height + ';';
    }
    if (that.maxHeight) {
      that.style += 'max-height: ' + that.maxHeight + ';';
    }
    if (that.height || that.maxHeight) {
      that.style += 'overflow-y: ' + that.overflowY + ';';
    }
    that.style += '}';
    if (that.videoSource) {
      that.style += '.videoModalBody {position: relative;padding-bottom: 56.25%;' +
        'padding-top: 30px;height: 0;overflow: hidden;}' +
        '.videoModalBody iframe, .videoModalBody object, .videoModalBody embed {' +
        'position: absolute;top: 5%;left: 3.5%;width: 93%;height: 90%;}';
    }
    that.style += '</style>';
  }


  //Start of html
  html = '<div id="puyModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="message-modal" aria-hidden="true">';
  html += that.style;
  html += '<div class="modal-dialog">';
  html += '<div class="modal-content" style="display: block;">';
  html += '<div class="modal-header modal-title">';
  html += '<h4>' + that.title + '</h4>';
  html += '<a class="close" data-dismiss="modal">X</a>';
  html += '</div>';
  if (that.type == 'general') {
    html += '<div class="modal-body puyModalBody">';
    if (that.loadPage) {
      html += '<p class="modal-message text-center">Please wait while the content is being loaded...</p>';
    } else {
      if (that.heading) {
        html += '<h2 class="modal-heading text-center">' + that.heading + '</h2>';
      }
      html += '<p class="modal-message text-center">' + that.message + '</p>';
    }
  } else if (that.type == 'video') {
    html += that.videoPayload;
  } else if (that.type == 'iframe') {
    html += '<div class="modal-body puyModalBody">';
    html += '<iframe src="' + that.iframe + '" ' + getIframeParams(that.iframeWidth, that.iframeHeight) + '>';
  }
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  $('body').append(html);
  $("#puyModal").modal();
  if (that.loadPage) {
    $("#puyModal .puyModalBody").load(that.loadPage);
  }
  $('#puyModal').on('hidden.bs.modal', function(e) {
    $(this).remove();
  });

}

function hideModals() {
  if ($('.modal').length > 0) {
    $('.modal').modal('hide');
  }
}