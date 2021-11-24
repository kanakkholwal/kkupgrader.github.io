
  const App = {
    data() {
      return {
        google: {
          pageTitle: "Bootstrap 5 & Material Design 2.0",
          pageDescription:
            "Material Design for Bootstrap 5. 500+ components, free templates, 1-min installation, extensive tutorial, huge community.",
          siteImage: "https://mdbgo.io/ascensus/mdb-advanced/img/mdb.jpg",
        },
        OG: {
          pageTitle: "Bootstrap 5 & Material Design 2.0",
          pageDescription:
            "500+ material UI components. Free for personal and commercial use.",
          previewImage: "https://mdbgo.io/ascensus/mdb-advanced/img/mdb.jpg",
          URL: "https://mdbootstrap.com/",
          siteName: "Material Design for Bootstrap",
          locale: "en_US",
        },
        twitter: {
          pageTitle: "Bootstrap 5 & Material Design 2.0",
          pageDescription:
            "Material Design for Bootstrap 5. 500+ components, free templates, 1-min installation, extensive tutorial, huge community",
          previewImage: "https://mdbgo.io/ascensus/mdb-advanced/img/mdb.jpg",
        },
      };
    },
    computed: {},
    mounted() {
      document.querySelectorAll(".form-outline").forEach((formOutline) => {
        new mdb.Input(formOutline).update();
      });
    },
    methods: {
      getHTMLCode() {
        return html_beautify(
          `
              <!-- COMMON TAGS -->
              <meta charset="utf-8">
              <title>${this.google.pageTitle}</title>
              <!-- Search Engine -->
              <meta name="description" content="${this.google.pageDescription}">
              <meta name="image" content="${this.google.siteImage}">
              <!-- Schema.org for Google -->
              <meta itemprop="name" content="${this.google.pageTitle}">
              <meta itemprop="description" content="${this.google.pageDescription}">
              <meta itemprop="image" content="${this.google.siteImage}">
              <!-- Open Graph general (Facebook, Pinterest & LinkedIn) -->
              <meta property="og:title" content="${this.OG.pageTitle}">
              <meta property="og:description" content="${this.OG.pageDescription}">
              <meta property="og:image" content="${this.OG.previewImage}">
              <meta property="og:url" content="${this.OG.URL}">
              <meta property="og:site_name" content="${this.OG.siteName}">
              <meta property="og:locale" content="${this.OG.locale}">
              <meta property="og:type" content="website">
              <!-- Twitter -->
              <meta property="twitter:card" content="summary">
              <meta property="twitter:title" content="${this.twitter.pageTitle}">
              <meta property="twitter:description" content="${this.twitter.pageDescription}">
              <meta property="twitter:image:src" content="${this.twitter.previewImage}">
               `,
          {
            indent_size: "2",
          }
        );
      },
      getSnippetElement() {
        return this.$refs.code.querySelector(
          `.language-${this.getActiveTab()} code`
        );
      },
      getActiveTab() {
        return this.$refs.code
          .querySelector(".docs-pills .nav-link.active")
          .textContent.toLowerCase();
      },
      handleTabChange() {
        const links = this.$refs.code.querySelectorAll(".docs-pills .nav-link");

        if (links.length > 1) {
          links.forEach((link) => {
            link.addEventListener("click", this.updatePrism, false);
          });
        }
      },
      updateCopyButton(code) {
        new ClipboardJS(".btn-copy-code", {
          text: () => {
            return code;
          },
        });
      },
      updatePrism() {
        const snippet = this.getSnippetElement();
        let activeCode = "";

        if (this.getActiveTab() === "html") {
          activeCode = this.getHTMLCode();
        }

        snippet.textContent = activeCode;

        Prism.highlightAll();
        this.updateCopyButton(activeCode);
      },

      mounted() {
        setTimeout(() => {
          this.updatePrism();
          this.handleTabChange();
        }, 100);
      },
      clearData: function (event) {
        this.google.pageTitle = "";
        this.google.pageDescription = "";
        this.google.siteImage = "";
        this.OG.pageTitle = "";
        this.OG.pageDescription = "";
        this.OG.previewImage = "";
        this.OG.URL = "";
        this.OG.siteName = "";
        this.OG.locale = "";
        this.twitter.pageTitle = "";
        this.twitter.pageDescription = "";
        this.twitter.previewImage = "";
      },
    },

    watch: {
      // 'parent.test': function () {
      //   this.$nextTick(() => this.updatePrism());
      // },
      google: {
        handler(val) {
          this.$nextTick(() => this.updatePrism());
        },
        deep: true,
      },

      OG: {
        handler(val) {
          this.$nextTick(() => this.updatePrism());
        },
        deep: true,
      },

      twitter: {
        handler(val) {
          this.$nextTick(() => this.updatePrism());
        },
        deep: true,
      },
    },
  };

  Vue.createApp(App).mount("#app2");
