(function() {
  describe("Nord Atom UI theme", function() {
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('nord-atom-ui');
      });
    });
    return it("allows to use darker colors for focused forms to be set via theme settings", function() {
      expect(document.documentElement.getAttribute('theme-nord-atom-ui-form-focus-effect')).toBe(null);
      atom.config.set('nord-atom-ui.darkerFormFocusEffect', true);
      return expect(document.documentElement.getAttribute('theme-nord-atom-ui-form-focus-effect')).toBe('nosnowlight');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvcGllcnJlbS8uYXRvbS9wYWNrYWdlcy9ub3JkLWF0b20tdWkvc3BlYy9kYXJrZXItZm9ybS1mb2N1c2luZy1lZmZlY3Qtc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0E7RUFBQSxRQUFBLENBQVMsb0JBQVQsRUFBK0IsU0FBQTtJQUM3QixVQUFBLENBQVcsU0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixjQUE5QjtNQURjLENBQWhCO0lBRFMsQ0FBWDtXQUlBLEVBQUEsQ0FBRyw0RUFBSCxFQUFpRixTQUFBO01BQy9FLE1BQUEsQ0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQXpCLENBQXNDLHNDQUF0QyxDQUFQLENBQXFGLENBQUMsSUFBdEYsQ0FBMkYsSUFBM0Y7TUFFQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0NBQWhCLEVBQXNELElBQXREO2FBQ0EsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBekIsQ0FBc0Msc0NBQXRDLENBQVAsQ0FBcUYsQ0FBQyxJQUF0RixDQUEyRixhQUEzRjtJQUorRSxDQUFqRjtFQUw2QixDQUEvQjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiIyBDb3B5cmlnaHQgKEMpIDIwMTYtcHJlc2VudCBBcmN0aWMgSWNlIFN0dWRpbyA8ZGV2ZWxvcG1lbnRAYXJjdGljaWNlc3R1ZGlvLmNvbT5cbiMgQ29weXJpZ2h0IChDKSAyMDE2LXByZXNlbnQgU3ZlbiBHcmViIDxkZXZlbG9wbWVudEBzdmVuZ3JlYi5kZT5cblxuIyBQcm9qZWN0OiAgICBOb3JkIEF0b20gVUlcbiMgUmVwb3NpdG9yeTogaHR0cHM6Ly9naXRodWIuY29tL2FyY3RpY2ljZXN0dWRpby9ub3JkLWF0b20tdWlcbiMgTGljZW5zZTogICAgTUlUXG5cbmRlc2NyaWJlIFwiTm9yZCBBdG9tIFVJIHRoZW1lXCIsIC0+XG4gIGJlZm9yZUVhY2ggLT5cbiAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdub3JkLWF0b20tdWknKVxuXG4gIGl0IFwiYWxsb3dzIHRvIHVzZSBkYXJrZXIgY29sb3JzIGZvciBmb2N1c2VkIGZvcm1zIHRvIGJlIHNldCB2aWEgdGhlbWUgc2V0dGluZ3NcIiwgLT5cbiAgICBleHBlY3QoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgndGhlbWUtbm9yZC1hdG9tLXVpLWZvcm0tZm9jdXMtZWZmZWN0JykpLnRvQmUgbnVsbFxuXG4gICAgYXRvbS5jb25maWcuc2V0KCdub3JkLWF0b20tdWkuZGFya2VyRm9ybUZvY3VzRWZmZWN0JywgdHJ1ZSlcbiAgICBleHBlY3QoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgndGhlbWUtbm9yZC1hdG9tLXVpLWZvcm0tZm9jdXMtZWZmZWN0JykpLnRvQmUgJ25vc25vd2xpZ2h0J1xuIl19
