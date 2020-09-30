Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.activate = activate;
exports.deactivate = deactivate;

var _utils = require('./utils');

var _fontsSelector = require('./fonts-selector');

'use babel';

var disposables = null;

function activate() {
  // migrate config
  if (atom.config.get('fonts.fontFamily') === '3270') {
    atom.config.set('fonts.fontFamily', 'IBM 3270');
  }

  var _require = require('atom');

  var CompositeDisposable = _require.CompositeDisposable;

  disposables = new CompositeDisposable();

  disposables.add(
  // NOTE: applyFont always returns functionally the same disposable, so
  // we're only using it once
  (0, _utils.applyFont)(atom.config.get('fonts.fontFamily')),
  // apply fonts when config changes
  atom.config.onDidChange('fonts.fontFamily', function (_ref) {
    var newValue = _ref.newValue;

    (0, _utils.applyFont)(newValue);
  }), atom.config.onDidChange('fonts.secondaryFonts', function () {
    (0, _utils.applyFont)(atom.config.get('fonts.fontFamily'));
  }),
  // command to show fonts selector
  atom.commands.add('atom-workspace', 'fonts:open-font-selector', function () {
    atom.workspace.open(new _fontsSelector.FontsSelector(), { split: 'right' });
  }));

  // give chromium some time to load the fonts
  // then trigger measurements
  setTimeout(_utils.triggerMeasurements, 500);

  if (document.querySelector('fonts-fixer') === null) {
    disposables.add((0, _utils.addFixerElement)());
  }
}

function deactivate() {
  if (disposables) disposables.dispose();
  disposables = null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3BpZXJyZW0vLmF0b20vcGFja2FnZXMvZm9udHMvbGliL2ZvbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxQkFFZ0UsU0FBUzs7NkJBQzNDLGtCQUFrQjs7QUFIaEQsV0FBVyxDQUFBOztBQUtYLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQTs7QUFFZixTQUFTLFFBQVEsR0FBRzs7QUFFekIsTUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLE1BQU0sRUFBRTtBQUNsRCxRQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsQ0FBQTtHQUNoRDs7aUJBQytCLE9BQU8sQ0FBQyxNQUFNLENBQUM7O01BQXZDLG1CQUFtQixZQUFuQixtQkFBbUI7O0FBQzNCLGFBQVcsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUE7O0FBRXZDLGFBQVcsQ0FBQyxHQUFHOzs7QUFHYix3QkFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU5QyxNQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFTLElBQVksRUFBRTtRQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDN0QsMEJBQVUsUUFBUSxDQUFDLENBQUE7R0FDcEIsQ0FBQyxFQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLFlBQVc7QUFDekQsMEJBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO0dBQy9DLENBQUM7O0FBRUYsTUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLEVBQUUsWUFBVztBQUN6RSxRQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQ0FBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0dBQzdELENBQUMsQ0FDSCxDQUFBOzs7O0FBSUQsWUFBVSw2QkFBc0IsR0FBRyxDQUFDLENBQUE7O0FBRXBDLE1BQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDbEQsZUFBVyxDQUFDLEdBQUcsQ0FBQyw2QkFBaUIsQ0FBQyxDQUFBO0dBQ25DO0NBQ0Y7O0FBRU0sU0FBUyxVQUFVLEdBQUc7QUFDM0IsTUFBSSxXQUFXLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ3RDLGFBQVcsR0FBRyxJQUFJLENBQUE7Q0FDbkIiLCJmaWxlIjoiL2hvbWUvcGllcnJlbS8uYXRvbS9wYWNrYWdlcy9mb250cy9saWIvZm9udHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG5pbXBvcnQgeyBhcHBseUZvbnQsIHRyaWdnZXJNZWFzdXJlbWVudHMsIGFkZEZpeGVyRWxlbWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBGb250c1NlbGVjdG9yIH0gZnJvbSAnLi9mb250cy1zZWxlY3RvcidcblxubGV0IGRpc3Bvc2FibGVzID0gbnVsbFxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gIC8vIG1pZ3JhdGUgY29uZmlnXG4gIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2ZvbnRzLmZvbnRGYW1pbHknKSA9PT0gJzMyNzAnKSB7XG4gICAgYXRvbS5jb25maWcuc2V0KCdmb250cy5mb250RmFtaWx5JywgJ0lCTSAzMjcwJylcbiAgfVxuICBjb25zdCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSA9IHJlcXVpcmUoJ2F0b20nKVxuICBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBkaXNwb3NhYmxlcy5hZGQoXG4gICAgLy8gTk9URTogYXBwbHlGb250IGFsd2F5cyByZXR1cm5zIGZ1bmN0aW9uYWxseSB0aGUgc2FtZSBkaXNwb3NhYmxlLCBzb1xuICAgIC8vIHdlJ3JlIG9ubHkgdXNpbmcgaXQgb25jZVxuICAgIGFwcGx5Rm9udChhdG9tLmNvbmZpZy5nZXQoJ2ZvbnRzLmZvbnRGYW1pbHknKSksXG4gICAgLy8gYXBwbHkgZm9udHMgd2hlbiBjb25maWcgY2hhbmdlc1xuICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdmb250cy5mb250RmFtaWx5JywgZnVuY3Rpb24oeyBuZXdWYWx1ZSB9KSB7XG4gICAgICBhcHBseUZvbnQobmV3VmFsdWUpXG4gICAgfSksXG4gICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2ZvbnRzLnNlY29uZGFyeUZvbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICBhcHBseUZvbnQoYXRvbS5jb25maWcuZ2V0KCdmb250cy5mb250RmFtaWx5JykpXG4gICAgfSksXG4gICAgLy8gY29tbWFuZCB0byBzaG93IGZvbnRzIHNlbGVjdG9yXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywgJ2ZvbnRzOm9wZW4tZm9udC1zZWxlY3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgYXRvbS53b3Jrc3BhY2Uub3BlbihuZXcgRm9udHNTZWxlY3RvcigpLCB7IHNwbGl0OiAncmlnaHQnIH0pXG4gICAgfSlcbiAgKVxuXG4gIC8vIGdpdmUgY2hyb21pdW0gc29tZSB0aW1lIHRvIGxvYWQgdGhlIGZvbnRzXG4gIC8vIHRoZW4gdHJpZ2dlciBtZWFzdXJlbWVudHNcbiAgc2V0VGltZW91dCh0cmlnZ2VyTWVhc3VyZW1lbnRzLCA1MDApXG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ZvbnRzLWZpeGVyJykgPT09IG51bGwpIHtcbiAgICBkaXNwb3NhYmxlcy5hZGQoYWRkRml4ZXJFbGVtZW50KCkpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIGlmIChkaXNwb3NhYmxlcykgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIGRpc3Bvc2FibGVzID0gbnVsbFxufVxuIl19