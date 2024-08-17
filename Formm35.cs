using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _2212394_BTChuong1
{
    public partial class Formm35 : Form
    {
        public Formm35()
        {
            InitializeComponent();
        }
        private void Form35_Load(object sender, EventArgs e)
        {
            string nameLabel1 = "ctk31@gmail.com";
            this.linkLabel1.Text = nameLabel1;
            string nameLabel2 = "www.cntt31.net";
            this.linkLabel2.Text = nameLabel2;
            string strURL = "mailto:ctk31@gmail.com";
            this.linkLabel1.Links.Add(0, strURL.Length, strURL);
            strURL = "http://www.cnttk31.net";
            this.linkLabel2.Links.Add(0, strURL.Length, strURL);
        }
        private void linkLabel1_LinkClicked_1(object sender, LinkLabelLinkClickedEventArgs e)
        {
            string strURL = Convert.ToString(e.Link.LinkData);
            if (strURL.StartsWith("maillto:"))
                Process.Start(strURL + "?subject=hello");
        }


        private void linkLabel2_LinkClicked_1(object sender, LinkLabelLinkClickedEventArgs e)
        {
            string strURL = Convert.ToString(e.Link.LinkData);
            if (strURL.StartsWith("http://www."))
                Process.Start(strURL);
        }
    }
}
