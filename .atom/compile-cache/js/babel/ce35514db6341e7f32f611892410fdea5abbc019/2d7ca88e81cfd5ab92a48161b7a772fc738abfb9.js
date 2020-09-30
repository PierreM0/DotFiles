Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

'use babel';

var FontsSelector = (function () {
  function FontsSelector() {
    _classCallCheck(this, FontsSelector);

    var sel = document.createElement('select');
    sel.multiple = true;
    sel.style.width = '100%';
    sel.style.overflow = 'auto';
    sel.style.background = 'inherit';
    sel.style.border = 'none';
    sel.style.padding = '1em';
    sel.classList.add('native-key-bindings');
    var onChange = this._onChange.bind(this);
    sel.addEventListener('change', function () {
      onChange(this);
    });
    for (var fontFace of atom.config.schema.properties.fonts.properties.fontFamily['enum']) {
      var opt = document.createElement('option');
      opt.value = fontFace;
      opt.innerText = fontFace;
      opt.style.fontFamily = '"' + fontFace + '"';
      opt.style.fontSize = atom.config.get('editor.fontSize') + 'px';
      opt.style.height = 1.5 * atom.config.get('editor.fontSize') + 'px';
      if (atom.config.get('fonts.fontFamily') === fontFace) {
        opt.selected = true;
      }
      sel.appendChild(opt);
    }
    this.element = sel;
  }

  _createClass(FontsSelector, [{
    key: 'getTitle',
    value: function getTitle() {
      return 'Fonts Selector';
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.fontFamily) atom.config.set('fonts.fontFamily', this.fontFamily);
    }

    /**
     * @param {HTMLSelectElement} target
     */
  }, {
    key: '_onChange',
    value: function _onChange(target) {
      if (target.value) {
        this.fontFamily = target.value;
        (0, _utils.applyFont)(this.fontFamily);
      }
    }
  }]);

  return FontsSelector;
})();

exports.FontsSelector = FontsSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3BpZXJyZW0vLmF0b20vcGFja2FnZXMvZm9udHMvbGliL2ZvbnRzLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3FCQUUwQixTQUFTOztBQUZuQyxXQUFXLENBQUE7O0lBSUUsYUFBYTtBQUNiLFdBREEsYUFBYSxHQUNWOzBCQURILGFBQWE7O0FBRXRCLFFBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDNUMsT0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7QUFDbkIsT0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFBO0FBQ3hCLE9BQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQTtBQUMzQixPQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7QUFDaEMsT0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0FBQ3pCLE9BQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtBQUN6QixPQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3hDLFFBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFDLE9BQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztBQUN4QyxjQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDZixDQUFDLENBQUE7QUFDRixTQUFLLElBQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUNsRSxVQUFVLFFBQUssRUFBRTtBQUNsQixVQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzVDLFNBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO0FBQ3BCLFNBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0FBQ3hCLFNBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxTQUFPLFFBQVEsTUFBRyxDQUFBO0FBQ3RDLFNBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQUksQ0FBQTtBQUM5RCxTQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBSSxDQUFBO0FBQ2xFLFVBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsS0FBSyxRQUFRLEVBQUU7QUFDcEQsV0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7T0FDcEI7QUFDRCxTQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3JCO0FBQ0QsUUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7R0FDbkI7O2VBNUJVLGFBQWE7O1dBNkJoQixvQkFBRztBQUNULGFBQU8sZ0JBQWdCLENBQUE7S0FDeEI7OztXQUNNLG1CQUFHO0FBQ1IsVUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtLQUMxRTs7Ozs7OztXQUlRLG1CQUFDLE1BQU0sRUFBRTtBQUNoQixVQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDaEIsWUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO0FBQzlCLDhCQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtPQUMzQjtLQUNGOzs7U0EzQ1UsYUFBYSIsImZpbGUiOiIvaG9tZS9waWVycmVtLy5hdG9tL3BhY2thZ2VzL2ZvbnRzL2xpYi9mb250cy1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmltcG9ydCB7IGFwcGx5Rm9udCB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBGb250c1NlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgc2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0JylcbiAgICBzZWwubXVsdGlwbGUgPSB0cnVlXG4gICAgc2VsLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgc2VsLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXG4gICAgc2VsLnN0eWxlLmJhY2tncm91bmQgPSAnaW5oZXJpdCdcbiAgICBzZWwuc3R5bGUuYm9yZGVyID0gJ25vbmUnXG4gICAgc2VsLnN0eWxlLnBhZGRpbmcgPSAnMWVtJ1xuICAgIHNlbC5jbGFzc0xpc3QuYWRkKCduYXRpdmUta2V5LWJpbmRpbmdzJylcbiAgICBjb25zdCBvbkNoYW5nZSA9IHRoaXMuX29uQ2hhbmdlLmJpbmQodGhpcylcbiAgICBzZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICBvbkNoYW5nZSh0aGlzKVxuICAgIH0pXG4gICAgZm9yIChjb25zdCBmb250RmFjZSBvZiBhdG9tLmNvbmZpZy5zY2hlbWEucHJvcGVydGllcy5mb250cy5wcm9wZXJ0aWVzXG4gICAgICAuZm9udEZhbWlseS5lbnVtKSB7XG4gICAgICBjb25zdCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgb3B0LnZhbHVlID0gZm9udEZhY2VcbiAgICAgIG9wdC5pbm5lclRleHQgPSBmb250RmFjZVxuICAgICAgb3B0LnN0eWxlLmZvbnRGYW1pbHkgPSBgXCIke2ZvbnRGYWNlfVwiYFxuICAgICAgb3B0LnN0eWxlLmZvbnRTaXplID0gYCR7YXRvbS5jb25maWcuZ2V0KCdlZGl0b3IuZm9udFNpemUnKX1weGBcbiAgICAgIG9wdC5zdHlsZS5oZWlnaHQgPSBgJHsxLjUgKiBhdG9tLmNvbmZpZy5nZXQoJ2VkaXRvci5mb250U2l6ZScpfXB4YFxuICAgICAgaWYgKGF0b20uY29uZmlnLmdldCgnZm9udHMuZm9udEZhbWlseScpID09PSBmb250RmFjZSkge1xuICAgICAgICBvcHQuc2VsZWN0ZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICBzZWwuYXBwZW5kQ2hpbGQob3B0KVxuICAgIH1cbiAgICB0aGlzLmVsZW1lbnQgPSBzZWxcbiAgfVxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gJ0ZvbnRzIFNlbGVjdG9yJ1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZm9udEZhbWlseSkgYXRvbS5jb25maWcuc2V0KCdmb250cy5mb250RmFtaWx5JywgdGhpcy5mb250RmFtaWx5KVxuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge0hUTUxTZWxlY3RFbGVtZW50fSB0YXJnZXRcbiAgICovXG4gIF9vbkNoYW5nZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnZhbHVlKSB7XG4gICAgICB0aGlzLmZvbnRGYW1pbHkgPSB0YXJnZXQudmFsdWVcbiAgICAgIGFwcGx5Rm9udCh0aGlzLmZvbnRGYW1pbHkpXG4gICAgfVxuICB9XG59XG4iXX0=