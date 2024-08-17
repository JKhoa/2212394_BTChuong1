using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _2212394_BTChuong1
{
    public partial class Form1 : Form
    {
        private Button btnMessage;
        private Button btnExit;
        public Form1()
        {
            this.Text = "Hello";
            btnMessage = new Button();
            btnMessage.Text = "&Message";
            btnMessage.Left = 10;
            btnMessage.Top = 20;
            btnMessage.Click += new EventHandler(this.OnMessageClick);
            btnExit = new Button();
            btnExit.Text = "&Exit";
            btnExit.Left = 100;
            btnExit.Top = 20;
            btnExit.Click += new EventHandler(this.OnExitClick);
            this.Controls.Add(btnExit);
            this.Controls.Add(btnMessage);
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void OnMessageClick(object sender, EventArgs e)
        {
            MessageBox.Show("Xin chao ca lop");

        }

        private void OnExitClick(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
