var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

/**
 * @param {string} fontName
 * @param {string} fallback
 * @param {string} fontStyle
 * @returns {Promise<[Uint8ClampedArray, HTMLCanvasElement]>}
 */

var getFontImage = _asyncToGenerator(function* (fontName, fallback, fontStyle) {
  var body = document.body;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create canvas');
  body.appendChild(canvas);
  canvas.width = 8000;
  canvas.height = 60;
  ctx.textAlign = 'start';
  ctx.textBaseline = 'bottom';
  var fontSpecStyle = undefined;
  switch (fontStyle) {
    case 'normal':
      fontSpecStyle = 'normal normal';
      break;
    case 'bold':
      fontSpecStyle = 'normal bold';
      break;
    case 'italic':
      fontSpecStyle = 'italic normal';
      break;
    case 'bold-italic':
      fontSpecStyle = 'italic bold';
      break;
    case '':
      fontSpecStyle = '';
      break;
    default:
      throw new Error('Unknown font style ' + fontStyle);
  }
  var fontSpec = fontSpecStyle + ' ' + fontSize + ' "' + fontName + '", ' + fallback;
  // @ts-ignore
  yield document.fonts.load(fontSpec);
  ctx.font = fontSpec;
  ctx.fillStyle = '#ffffff';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(testString, 10, 50);
  var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = idata.data;
  return [data, canvas];
}

/**
 * @param {string} fontName
 * @param {string} fontPath
 * @param {string} fontStyle
 */
);

var compareFonts = _asyncToGenerator(function* (fontName, fontPath, fontStyle) {
  var tempFontName = 'Temp Font';
  var fontBuf = (0, _fs.readFileSync)(_path.join.apply(undefined, [resourceDir].concat(_toConsumableArray(fontPath.split('/')))));
  // @ts-ignore
  var f = new FontFace(tempFontName, fontBuf);
  yield f.load();
  // @ts-ignore
  document.fonts.add(f);

  var _ref = yield getFontImage(fontName, 'monospace', fontStyle);

  var _ref2 = _slicedToArray(_ref, 2);

  var nameIm = _ref2[0];
  var nic = _ref2[1];

  var _ref3 = yield getFontImage(tempFontName, 'monospace', '');

  var _ref32 = _slicedToArray(_ref3, 2);

  var fileIm = _ref32[0];
  var fic = _ref32[1];

  // @ts-ignore
  document.fonts['delete'](f);

  nic.remove();
  fic.remove();

  for (var j = 0; j < nameIm.length; j++) {
    if (nameIm[j] !== fileIm[j]) {
      return false;
    }
  }

  return true;
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var _jsYaml = require('js-yaml');

var _fs = require('fs');

var _path = require('path');

var _scriptsLib = require('../scripts/lib');

'use babel';

var doc = (0, _jsYaml.safeLoad)((0, _fs.readFileSync)((0, _path.join)(__dirname, '..', 'scripts', 'fonts.yaml'), 'utf8'));
var resourceDir = (0, _path.join)(__dirname, '..', 'resources');
var fontSize = '40px';
// all printable ASCII symbols except excludedChars
var excludedChars = '^`~'; // the first two missing in Lekton, the last one's missing in League
var testString = Array(127 - 32).fill(null).map(function (_, i) {
  return String.fromCharCode(32 + i);
}).filter(function (x) {
  return !excludedChars.includes(x);
}).join('');

describe('Fonts from resources/ are distinct from fallback serif (i.e. they load)', function () {
  beforeEach(function () {
    var pkg = undefined;
    waitsForPromise(_asyncToGenerator(function* () {
      return pkg = yield atom.packages.activatePackage('fonts');
    }));
    waitsFor(function () {
      return atom.packages.isPackageActive('fonts');
    });
    waitsFor(function () {
      return pkg.stylesheetsActivated;
    });
  });

  /**
   * @param {any} font
   * @param {string} style
   * @param {string} file
   */
  function* testFont(font, style, file) {
    var result = undefined;
    it('Loads ' + font + ' with ' + style + ' from ' + file, function () {
      waitsForPromise(_asyncToGenerator(function* () {
        result = yield compareFonts('serif', file, style);
      }));
      runs(function () {
        expect(result).toBe(false);
      });
    });
  }

  Array.from((0, _scriptsLib.walkFonts)(_scriptsLib.handleFontsDefinition.bind(null, _scriptsLib.addFontByDesc.bind(null, testFont)), doc, {}, null));
});

describe('Font rendering', function () {
  beforeEach(function () {
    var pkg = undefined;
    waitsForPromise(_asyncToGenerator(function* () {
      return pkg = yield atom.packages.activatePackage('fonts');
    }));
    waitsFor(function () {
      return atom.packages.isPackageActive('fonts');
    });
    waitsFor(function () {
      return pkg.stylesheetsActivated;
    });
  });

  /**
   * @param {string} font
   * @param {string} style
   * @param {string} file
   */
  function* testFont(font, style, file) {
    var result = undefined;
    it('matches between named \'' + font + '\' with style \'' + style + '\' and file \'' + file + '\'', function () {
      waitsForPromise(_asyncToGenerator(function* () {
        result = yield compareFonts(font, file, style);
      }));
      runs(function () {
        expect(result).toBe(true);
      });
    });
  }

  Array.from((0, _scriptsLib.walkFonts)(_scriptsLib.handleFontsDefinition.bind(null, _scriptsLib.addFontByDesc.bind(null, testFont)), doc, {}, null));
});

describe('Computed TextEditor font family', function () {
  var editor = undefined;
  beforeEach(function () {
    var pkg = undefined;
    waitsForPromise(_asyncToGenerator(function* () {
      return editor = yield atom.workspace.open();
    }));
    runs(function () {
      return editor.setText(testString);
    });
    waitsForPromise(_asyncToGenerator(function* () {
      return pkg = yield atom.packages.activatePackage('fonts');
    }));
    waitsFor(function () {
      return atom.packages.isPackageActive('fonts');
    });
    waitsFor(function () {
      return pkg.stylesheetsActivated;
    });
    runs(function () {
      document.body.appendChild(atom.views.getView(atom.workspace));
    });
  });
  afterEach(function () {
    runs(function () {
      atom.views.getView(atom.workspace).remove();
    });
  });

  var fontVariantsSet = new Set((0, _scriptsLib.walkFonts)(_scriptsLib.handleFontsDefinition.bind(null, function* ( /** @type {string} */font) {
    yield font;
  }), doc, {}, null));

  var _loop = function (font) {
    it('matches ' + font + ' when set in config', function () {
      var editorFontName = undefined;
      atom.config.set('fonts.fontFamily', font);
      editorFontName = getComputedStyle(atom.views.getView(editor)).fontFamily.split(',')[0].trim().replace(/"/g, '');
      expect(editorFontName).toBe(font);
    });
  };

  for (var font of fontVariantsSet.values()) {
    _loop(font);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3BpZXJyZW0vLmF0b20vcGFja2FnZXMvZm9udHMvc3BlYy9mb250cy1zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztJQTBCZSxZQUFZLHFCQUEzQixXQUE0QixRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtBQUN6RCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO0FBQzFCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDL0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNuQyxNQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtBQUNwRCxNQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3hCLFFBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0FBQ25CLFFBQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO0FBQ2xCLEtBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFBO0FBQ3ZCLEtBQUcsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFBO0FBQzNCLE1BQUksYUFBYSxZQUFBLENBQUE7QUFDakIsVUFBUSxTQUFTO0FBQ2YsU0FBSyxRQUFRO0FBQ1gsbUJBQWEsR0FBRyxlQUFlLENBQUE7QUFDL0IsWUFBSztBQUFBLEFBQ1AsU0FBSyxNQUFNO0FBQ1QsbUJBQWEsR0FBRyxhQUFhLENBQUE7QUFDN0IsWUFBSztBQUFBLEFBQ1AsU0FBSyxRQUFRO0FBQ1gsbUJBQWEsR0FBRyxlQUFlLENBQUE7QUFDL0IsWUFBSztBQUFBLEFBQ1AsU0FBSyxhQUFhO0FBQ2hCLG1CQUFhLEdBQUcsYUFBYSxDQUFBO0FBQzdCLFlBQUs7QUFBQSxBQUNQLFNBQUssRUFBRTtBQUNMLG1CQUFhLEdBQUcsRUFBRSxDQUFBO0FBQ2xCLFlBQUs7QUFBQSxBQUNQ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WCxDQUFDLEVBQ0YsR0FBRyxFQUNILEVBQUUsRUFDRixJQUFJLENBQ0wsQ0FDRixDQUFBOzt3QkFFVSxJQUFJO0FBQ2IsTUFBRSxjQUFZLElBQUksMEJBQXVCLFlBQVc7QUFDbEQsVUFBSSxjQUFjLFlBQUEsQ0FBQTtBQUNsQixVQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN6QyxvQkFBYyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQzFELFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3hCLElBQUksRUFBRSxDQUNOLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDcEIsWUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNsQyxDQUFDLENBQUE7OztBQVRKLE9BQUssSUFBTSxJQUFJLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFO1VBQWxDLElBQUk7R0FVZDtDQUNGLENBQUMsQ0FBQSIsImZpbGUiOiIvaG9tZS9waWVycmVtLy5hdG9tL3BhY2thZ2VzL2ZvbnRzL3NwZWMvZm9udHMtc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmltcG9ydCB7IHNhZmVMb2FkIH0gZnJvbSAnanMteWFtbCdcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyB3YWxrRm9udHMsIGhhbmRsZUZvbnRzRGVmaW5pdGlvbiwgYWRkRm9udEJ5RGVzYyB9IGZyb20gJy4uL3NjcmlwdHMvbGliJ1xuXG5jb25zdCBkb2MgPSBzYWZlTG9hZChcbiAgcmVhZEZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCAnLi4nLCAnc2NyaXB0cycsICdmb250cy55YW1sJyksICd1dGY4JylcbilcbmNvbnN0IHJlc291cmNlRGlyID0gam9pbihfX2Rpcm5hbWUsICcuLicsICdyZXNvdXJjZXMnKVxuY29uc3QgZm9udFNpemUgPSAnNDBweCdcbi8vIGFsbCBwcmludGFibGUgQVNDSUkgc3ltYm9scyBleGNlcHQgZXhjbHVkZWRDaGFyc1xuY29uc3QgZXhjbHVkZWRDaGFycyA9ICdeYH4nIC8vIHRoZSBmaXJzdCB0d28gbWlzc2luZyBpbiBMZWt0b24sIHRoZSBsYXN0IG9uZSdzIG1pc3NpbmcgaW4gTGVhZ3VlXG5jb25zdCB0ZXN0U3RyaW5nID0gQXJyYXkoMTI3IC0gMzIpXG4gIC5maWxsKG51bGwpXG4gIC5tYXAoKF8sIGkpID0+IFN0cmluZy5mcm9tQ2hhckNvZGUoMzIgKyBpKSlcbiAgLmZpbHRlcih4ID0+ICFleGNsdWRlZENoYXJzLmluY2x1ZGVzKHgpKVxuICAuam9pbignJylcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9udE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9IGZvbnRTdHlsZVxuICogQHJldHVybnMge1Byb21pc2U8W1VpbnQ4Q2xhbXBlZEFycmF5LCBIVE1MQ2FudmFzRWxlbWVudF0+fVxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRGb250SW1hZ2UoZm9udE5hbWUsIGZhbGxiYWNrLCBmb250U3R5bGUpIHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHlcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgaWYgKCFjdHgpIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBjYW52YXMnKVxuICBib2R5LmFwcGVuZENoaWxkKGNhbnZhcylcbiAgY2FudmFzLndpZHRoID0gODAwMFxuICBjYW52YXMuaGVpZ2h0ID0gNjBcbiAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCdcbiAgY3R4LnRleHRCYXNlbGluZSA9ICdib3R0b20nXG4gIGxldCBmb250U3BlY1N0eWxlXG4gIHN3aXRjaCAoZm9udFN0eWxlKSB7XG4gICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgIGZvbnRTcGVjU3R5bGUgPSAnbm9ybWFsIG5vcm1hbCdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYm9sZCc6XG4gICAgICBmb250U3BlY1N0eWxlID0gJ25vcm1hbCBib2xkJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdpdGFsaWMnOlxuICAgICAgZm9udFNwZWNTdHlsZSA9ICdpdGFsaWMgbm9ybWFsJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdib2xkLWl0YWxpYyc6XG4gICAgICBmb250U3BlY1N0eWxlID0gJ2l0YWxpYyBib2xkJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlICcnOlxuICAgICAgZm9udFNwZWNTdHlsZSA9ICcnXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZm9udCBzdHlsZSAke2ZvbnRTdHlsZX1gKVxuICB9XG4gIGNvbnN0IGZvbnRTcGVjID0gYCR7Zm9udFNwZWNTdHlsZX0gJHtmb250U2l6ZX0gXCIke2ZvbnROYW1lfVwiLCAke2ZhbGxiYWNrfWBcbiAgLy8gQHRzLWlnbm9yZVxuICBhd2FpdCBkb2N1bWVudC5mb250cy5sb2FkKGZvbnRTcGVjKVxuICBjdHguZm9udCA9IGZvbnRTcGVjXG4gIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZidcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gIGN0eC5maWxsVGV4dCh0ZXN0U3RyaW5nLCAxMCwgNTApXG4gIGNvbnN0IGlkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gIGNvbnN0IGRhdGEgPSBpZGF0YS5kYXRhXG4gIHJldHVybiBbZGF0YSwgY2FudmFzXVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb250TmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZvbnRQYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9udFN0eWxlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNvbXBhcmVGb250cyhmb250TmFtZSwgZm9udFBhdGgsIGZvbnRTdHlsZSkge1xuICBjb25zdCB0ZW1wRm9udE5hbWUgPSAnVGVtcCBGb250J1xuICBjb25zdCBmb250QnVmID0gcmVhZEZpbGVTeW5jKGpvaW4ocmVzb3VyY2VEaXIsIC4uLmZvbnRQYXRoLnNwbGl0KCcvJykpKVxuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGYgPSBuZXcgRm9udEZhY2UodGVtcEZvbnROYW1lLCBmb250QnVmKVxuICBhd2FpdCBmLmxvYWQoKVxuICAvLyBAdHMtaWdub3JlXG4gIGRvY3VtZW50LmZvbnRzLmFkZChmKVxuXG4gIGNvbnN0IFtuYW1lSW0sIG5pY10gPSBhd2FpdCBnZXRGb250SW1hZ2UoZm9udE5hbWUsICdtb25vc3BhY2UnLCBmb250U3R5bGUpXG4gIGNvbnN0IFtmaWxlSW0sIGZpY10gPSBhd2FpdCBnZXRGb250SW1hZ2UodGVtcEZvbnROYW1lLCAnbW9ub3NwYWNlJywgJycpXG5cbiAgLy8gQHRzLWlnbm9yZVxuICBkb2N1bWVudC5mb250cy5kZWxldGUoZilcblxuICBuaWMucmVtb3ZlKClcbiAgZmljLnJlbW92ZSgpXG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBuYW1lSW0ubGVuZ3RoOyBqKyspIHtcbiAgICBpZiAobmFtZUltW2pdICE9PSBmaWxlSW1bal0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmRlc2NyaWJlKCdGb250cyBmcm9tIHJlc291cmNlcy8gYXJlIGRpc3RpbmN0IGZyb20gZmFsbGJhY2sgc2VyaWYgKGkuZS4gdGhleSBsb2FkKScsIGZ1bmN0aW9uKCkge1xuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgIGxldCBwa2dcbiAgICB3YWl0c0ZvclByb21pc2UoXG4gICAgICBhc3luYyAoKSA9PiAocGtnID0gYXdhaXQgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2ZvbnRzJykpXG4gICAgKVxuICAgIHdhaXRzRm9yKCgpID0+IGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmb250cycpKVxuICAgIHdhaXRzRm9yKCgpID0+IHBrZy5zdHlsZXNoZWV0c0FjdGl2YXRlZClcbiAgfSlcblxuICAvKipcbiAgICogQHBhcmFtIHthbnl9IGZvbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlXG4gICAqL1xuICBmdW5jdGlvbiogdGVzdEZvbnQoZm9udCwgc3R5bGUsIGZpbGUpIHtcbiAgICBsZXQgcmVzdWx0XG4gICAgaXQoYExvYWRzICR7Zm9udH0gd2l0aCAke3N0eWxlfSBmcm9tICR7ZmlsZX1gLCBmdW5jdGlvbigpIHtcbiAgICAgIHdhaXRzRm9yUHJvbWlzZShhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgY29tcGFyZUZvbnRzKCdzZXJpZicsIGZpbGUsIHN0eWxlKVxuICAgICAgfSlcbiAgICAgIHJ1bnMoZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoZmFsc2UpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBBcnJheS5mcm9tKFxuICAgIHdhbGtGb250cyhcbiAgICAgIGhhbmRsZUZvbnRzRGVmaW5pdGlvbi5iaW5kKG51bGwsIGFkZEZvbnRCeURlc2MuYmluZChudWxsLCB0ZXN0Rm9udCkpLFxuICAgICAgZG9jLFxuICAgICAge30sXG4gICAgICBudWxsXG4gICAgKVxuICApXG59KVxuXG5kZXNjcmliZSgnRm9udCByZW5kZXJpbmcnLCBmdW5jdGlvbigpIHtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICBsZXQgcGtnXG4gICAgd2FpdHNGb3JQcm9taXNlKFxuICAgICAgYXN5bmMgKCkgPT4gKHBrZyA9IGF3YWl0IGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdmb250cycpKVxuICAgIClcbiAgICB3YWl0c0ZvcigoKSA9PiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZm9udHMnKSlcbiAgICB3YWl0c0ZvcigoKSA9PiBwa2cuc3R5bGVzaGVldHNBY3RpdmF0ZWQpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmb250XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVxuICAgKi9cbiAgZnVuY3Rpb24qIHRlc3RGb250KGZvbnQsIHN0eWxlLCBmaWxlKSB7XG4gICAgbGV0IHJlc3VsdFxuICAgIGl0KGBtYXRjaGVzIGJldHdlZW4gbmFtZWQgJyR7Zm9udH0nIHdpdGggc3R5bGUgJyR7c3R5bGV9JyBhbmQgZmlsZSAnJHtmaWxlfSdgLCBmdW5jdGlvbigpIHtcbiAgICAgIHdhaXRzRm9yUHJvbWlzZShhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgY29tcGFyZUZvbnRzKGZvbnQsIGZpbGUsIHN0eWxlKVxuICAgICAgfSlcbiAgICAgIHJ1bnMoZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUodHJ1ZSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIEFycmF5LmZyb20oXG4gICAgd2Fsa0ZvbnRzKFxuICAgICAgaGFuZGxlRm9udHNEZWZpbml0aW9uLmJpbmQobnVsbCwgYWRkRm9udEJ5RGVzYy5iaW5kKG51bGwsIHRlc3RGb250KSksXG4gICAgICBkb2MsXG4gICAgICB7fSxcbiAgICAgIG51bGxcbiAgICApXG4gIClcbn0pXG5cbmRlc2NyaWJlKCdDb21wdXRlZCBUZXh0RWRpdG9yIGZvbnQgZmFtaWx5JywgZnVuY3Rpb24oKSB7XG4gIGxldCBlZGl0b3JcbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICBsZXQgcGtnXG4gICAgd2FpdHNGb3JQcm9taXNlKGFzeW5jICgpID0+IChlZGl0b3IgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKCkpKVxuICAgIHJ1bnMoKCkgPT4gZWRpdG9yLnNldFRleHQodGVzdFN0cmluZykpXG4gICAgd2FpdHNGb3JQcm9taXNlKFxuICAgICAgYXN5bmMgKCkgPT4gKHBrZyA9IGF3YWl0IGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdmb250cycpKVxuICAgIClcbiAgICB3YWl0c0ZvcigoKSA9PiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZm9udHMnKSlcbiAgICB3YWl0c0ZvcigoKSA9PiBwa2cuc3R5bGVzaGVldHNBY3RpdmF0ZWQpXG4gICAgcnVucygoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSkpXG4gICAgfSlcbiAgfSlcbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgIHJ1bnMoKCkgPT4ge1xuICAgICAgYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKS5yZW1vdmUoKVxuICAgIH0pXG4gIH0pXG5cbiAgY29uc3QgZm9udFZhcmlhbnRzU2V0ID0gbmV3IFNldChcbiAgICB3YWxrRm9udHMoXG4gICAgICBoYW5kbGVGb250c0RlZmluaXRpb24uYmluZChudWxsLCBmdW5jdGlvbiooLyoqIEB0eXBlIHtzdHJpbmd9ICovIGZvbnQpIHtcbiAgICAgICAgeWllbGQgZm9udFxuICAgICAgfSksXG4gICAgICBkb2MsXG4gICAgICB7fSxcbiAgICAgIG51bGxcbiAgICApXG4gIClcblxuICBmb3IgKGNvbnN0IGZvbnQgb2YgZm9udFZhcmlhbnRzU2V0LnZhbHVlcygpKSB7XG4gICAgaXQoYG1hdGNoZXMgJHtmb250fSB3aGVuIHNldCBpbiBjb25maWdgLCBmdW5jdGlvbigpIHtcbiAgICAgIGxldCBlZGl0b3JGb250TmFtZVxuICAgICAgYXRvbS5jb25maWcuc2V0KCdmb250cy5mb250RmFtaWx5JywgZm9udClcbiAgICAgIGVkaXRvckZvbnROYW1lID0gZ2V0Q29tcHV0ZWRTdHlsZShhdG9tLnZpZXdzLmdldFZpZXcoZWRpdG9yKSlcbiAgICAgICAgLmZvbnRGYW1pbHkuc3BsaXQoJywnKVswXVxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgIGV4cGVjdChlZGl0b3JGb250TmFtZSkudG9CZShmb250KVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=